import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SucursalSelect from '../comun/SucursalSelect'
import { useTareasExternasUpdate } from "../../context/TareasExternasContext"

const Login = ({onLoginOk, onLoginFail}) => {
  const [credenciales, setCredenciales] = useState({
    usuario: '',
    contrasena: '',
    sucursal: 0
  })
  const { login } = useAuth()
  const { asignaSucursalActual } = useTareasExternasUpdate()


  function handleChange(e) {
    setCredenciales(prevValue => ({...prevValue, [e.target.name]: e.target.value}))
  }  

  function handleSubmit(event) {
    event.preventDefault()
    login({
        usuario: credenciales.usuario,
        contrasena: credenciales.contrasena
    }).then(data => {
        if (data) {
            onLoginOk(data)
            asignaSucursalActual(credenciales.sucursal)
        } else {
            onLoginFail('La combinación usuario/contraseña es inválida')
        }
    })
  }

  return (
    <Container>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <SucursalSelect 
                    label='Sucursal Inicial'
                    onChange={handleChange} 
                    value={credenciales.sucursal}
                    name='sucursal' 
                />            
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control 
                    type='text'
                    placeholder="Escribe tu usuario..." 
                    onChange={handleChange}
                    name="usuario"
                    value={credenciales.usuario}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                    type='password'
                    placeholder="Escribe tu contraseña..." 
                    onChange={handleChange}
                    name="contrasena"
                    value={credenciales.contrasena}
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
