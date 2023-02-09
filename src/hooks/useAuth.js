import { createContext, useContext } from "react"
import { URL_APIS } from "../context/TareasExternasContext"
import { useLocalStorage } from './useLocalStorage'

export const ROLES = {
    ADMIN: 1,
    ENCARGADO: 2,
    CHOFER: 3
}

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [credenciales, setCredenciales] = useLocalStorage('credenciales', null)

    async function login(credenciales) {
        try {
            const response = await fetch(`${URL_APIS}/login`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credenciales)
            })
            const data = await response.json()

            if (data.length > 0) {
                const { id_usuario, usuario, nombre, email, id_rol } = data[0]
                const userInfo = { id_usuario: id_usuario, usuario: usuario, nombre: nombre, email: email, id_rol: id_rol} 
                setCredenciales(userInfo)
                return userInfo
            }
        } catch (err) {
            console.log(err)
        }
    }

    function logout() {
        setCredenciales(null)
    }

    function esEncargado() {
        return (esAdmin() || credenciales.id_rol === ROLES.ENCARGADO)
    }

    function esChofer() {
        return (esAdmin() || credenciales.id_rol === ROLES.CHOFER)
    }

    function esAdmin() {
        return credenciales.id_rol === ROLES.ADMIN
    }

    return (
        <AuthContext.Provider value={{
            credenciales, login, logout, esEncargado, esChofer, esAdmin
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
