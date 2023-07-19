import { EnvelopeSimple, Lock } from 'phosphor-react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Header, Container, Form, Text, Input, SubmitButton, Footer, FormError } from "./styles";

interface LoginProps {
  onFormSwitch: (data: string) => void
}

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Digite o email corretamente (example@example.com)' }),
  password: z.string().max(12, { message: 'A senha precisar ter no máximo 12 caracteres' }),
})

type LoginFormType = z.infer<typeof loginFormSchema>

export function Login({onFormSwitch}: LoginProps) {
  const { signIn } = useAuth()
  
  const [ isError, setIsError ] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema)
  })

  const router = useRouter()

  async function handleLoginSubmit(data: LoginFormType) {
    const { email, password } = data

    try {
      await signIn(email, password)
      router.push('/')
      setIsError(false)

    } catch (error) {
      setIsError(true)
    }
  }

  return (
    <Container>
      <Header>
        <h2>Login</h2>
        <p>Faça login e comece a usar!</p>
      </Header>

      <Form onSubmit={handleSubmit(handleLoginSubmit)}>
        <div>
          <label>
            <Text>Endereço de e-mail</Text>
            <Input>
              <EnvelopeSimple size={24} />
              <input placeholder='example@example.com' {...register('email')} />
            </Input>

            {errors.email && (
              <FormError>{errors.email.message}</FormError>
            )}

            {isError === true && (
              <FormError>Falha no login, e-mail ou senha incorreto</FormError>
            )}
          </label>

          <label>
            <Text>Sua senha</Text>
            <Input>
              <Lock size={24} />
              <input placeholder='********' {...register('password')} />
            </Input>

            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}

            {isError === true && (
              <FormError>Falha no login, e-mail ou senha incorreto</FormError>
            )}
          </label>
        </div>

        <SubmitButton type='submit' disabled={isSubmitting}>Entrar</SubmitButton>
      </Form>

      <Footer>
        <button onClick={() => onFormSwitch('register')}>
          Não possui conta? Registre-se agora
        </button>
      </Footer>
    </Container>
  )
}