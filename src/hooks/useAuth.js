import { createContext, useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from './useLocalStorage'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [credenciales, setCredenciales] = useLocalStorage('credenciales', null)
    const navigate = useNavigate()

    async function login(credenciales) {
        await fetch('http://localhost:8080/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            bodh: JSON.stringify(credenciales)
        }).then(data => data.json())

        setCredenciales(credenciales)
        navigate('/tracking/pendiente-recoleccion', { replace: true})
    }

    function logout() {
        setCredenciales(null)
        navigate('/login', { replace: true})
    }

    const value = useMemo(() => ({
        credenciales,
        login,
        logout
    }), [credenciales])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}
