import { Navigate, useOutlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const ProtectedLayout = () => {
    const { credenciales } = useAuth()
    const outlet = useOutlet()

    if (!credenciales) {
        return <Navigate to='/login' />
    }

    return (
        <div>
            {outlet}
        </div>
    )
}

export default ProtectedLayout
