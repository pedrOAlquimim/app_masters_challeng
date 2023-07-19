import { Login } from "@/components/auth/Login";
import { AuthContainer } from "./styles";
import { useState } from "react";
import { Register } from "@/components/auth/Register";

export default function Auth() {
  const [ formSwitch, setFormSwitch ] = useState<string>('login')

  return (
    <AuthContainer>
      {formSwitch === 'login' ? (
        <Login onFormSwitch={setFormSwitch} />
      ) : (
        <Register onFormSwitch={setFormSwitch} />
      )}
    </AuthContainer>
  )
}