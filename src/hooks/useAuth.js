import { createContext, useContext, useMemo } from "react"
import { useLocalStorage } from './useLocalStorage'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [credenciales, setCredenciales] = useLocalStorage('credenciales', null)

    async function login(credenciales) {
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credenciales)
            })
            const data = await response.json()

            if (data.length > 0) {
                const { usuario, nombre, email } = data[0]
                const userInfo = { usuario: usuario, nombre: nombre, email: email} 
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

    const value = useMemo(() => ({
        credenciales,
        login,
        logout
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
