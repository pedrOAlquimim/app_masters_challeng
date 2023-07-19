import { EnvelopeSimple, Lock, User } from 'phosphor-react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { Header, Container, Form, Text, Input, SubmitButton, Footer, FormError } from "./styles";

interface RegisterProps {
  onFormSwitch: (data: string) => void
}

const registerFormSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Digite o email corretamente (example@example.com)' }),
  password: z.string()
    .min(6, { message: 'A senha precisa ter pelo meno 6 caracteres' })
    .max(12, { message: 'A senha precisar ter no máximo 12 caracteres' }),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword , {
  path: ['confirmPassword'],
  message: 'As senhas precisam ser iguais',
})

type RegisterFormType = z.infer<typeof registerFormSchema>

export function Register({ onFormSwitch }: RegisterProps) {
  const { createUser } = useAuth()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema)
  })

  const router = useRouter()
  
  async function handleRegisterSubmit(data: RegisterFormType) {
    const { email, password, name } = data

    try {
      await createUser(name, email, password)
      router.push('/')

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <Header>
        <h2>Registre-se</h2>
        <p>Crie sua conta!</p>
      </Header>

      <Form onSubmit={handleSubmit(handleRegisterSubmit)}>
        <div>
        <label>
            <Text>Nome</Text>
            <Input>
              <User size={24} />
              <input placeholder='Digite seu nome' {...register('name')} />
            </Input>
          </label>

          <label>
            <Text>Endereço de e-mail</Text>
            <Input>
              <EnvelopeSimple size={24} />
              <input placeholder='Digte seu e-mail' {...register('email')} />
            </Input>

            {errors.email && (
              <FormError>{errors.email.message}</FormError>
            )}
          </label>

          <label>
            <Text>Sua senha</Text>
            <Input>
              <Lock size={24} />
              <input placeholder='Digite sua senha' {...register('password')} />
            </Input>

            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          </label>

          <label>
            <Text>Confirme sua senha</Text>
            <Input>
              <Lock size={24} />
              <input placeholder='Digite sua senha novamente' {...register('confirmPassword')} />
            </Input>

            {errors.confirmPassword && (
              <FormError>{errors.confirmPassword.message}</FormError>
            )}
          </label>
        </div>

        <SubmitButton type='submit' disabled={isSubmitting}>Registrar</SubmitButton>
      </Form>

      <Footer>
        <button onClick={() => onFormSwitch('login')}>Já possui conta? Faça o login agora</button>
      </Footer>
    </Container>
  )
}