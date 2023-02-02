import { Navigate, useOutlet } from "react-router-dom"

const ProtectedLayout = ({isLoggedIn}) => {
    const outlet = useOutlet()

    if (!isLoggedIn) {
        return <Navigate to='/login' />
    }

    return (
        <div>
            {outlet}
        </div>
    )
}

export default ProtectedLayout
