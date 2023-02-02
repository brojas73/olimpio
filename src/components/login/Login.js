import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = ({onLogin}) => {
  const [usuario, setUsuario] = useState()
  const [contrasena, setContrasena] = useState()
  const { login } = useAuth()

  async function handleSubmit(event) {
    event.preventDefault()
    console.log('Login.handleSubmit()')
    const data = await login({
        usuario,
        contrasena
    })

    // If we could connect
    if (data) {
        onLogin()
    }
  }

  return (
    <Container>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control 
                    type='text'
                    placeholder="Escribe tu usuario..." 
                    onChange={e => setUsuario(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                    type='password'
                    placeholder="Escribe tu contraseña..." 
                    onChange={e => setContrasena(e.target.value)}
                />
            </Form.Group>
            <Button 
                variant='primary' 
                type='submit'
            >
                Ingresar
            </Button>
        </Form>
    </Container>
  )
}

export default Login
