import { Navigate, useOutlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const HomeLayout = () => {
    const { credenciales } = useAuth()
    const outlet = useOutlet()

    if (credenciales) {
        return <Navigate to='/tracking/pendiente-recoleccion' replace />
    }

    console.log('HomeLayout.After if')
    return (
        <div>
            {outlet}
        </div>
    )
}

export default HomeLayout
