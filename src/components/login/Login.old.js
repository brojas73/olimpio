import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"

const Login = ({onLogin}) => {
  const [usuario, setUsuario] = useState()
  const [contrasena, setContrasena] = useState()
  const { login } = useAuth()

  async function handleSubmit(event) {
    event.preventDefault()
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
    <main className='main-container'>
        <div className='layout__body'>
            <h1>INGRESO AL SISTEMA</h1>
            <form onSubmit={handleSubmit}>
                <div className='form__group'>
                    <label>
                        <p>Usuario</p>
                        <input 
                            type='text' 
                            placeholder="Escribe tu usuario..."
                            onChange={e => setUsuario(e.target.value)}
                        />
                    </label>
                </div>
                <div className='form__group'>
                    <label>
                        <p>Contraseña</p>
                        <input 
                            type='password' 
                            placeholder="Escribe tu usuario..."
                            onChange={e => setContrasena(e.target.value)} 
                        />
                    </label>
                </div>
                <div className='form__action'>
                    <button className='btn btn--main' type='submit'>Ingresar</button>
                </div>
            </form>
        </div>
    </main>
  )
}

export default Login
