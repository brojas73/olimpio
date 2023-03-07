import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = ({onLoginOk, onLoginFail}) => {
  const [usuario, setUsuario] = useState()
  const [contrasena, setContrasena] = useState()
  const { login } = useAuth()

  function handleSubmit(event) {
    event.preventDefault()
    login({
        usuario,
        contrasena
    }).then(data => {
        if (data) {
            onLoginOk(data)
        } else {
            onLoginFail('La combinación usuario/contraseña es inválida')
        }
    })
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
