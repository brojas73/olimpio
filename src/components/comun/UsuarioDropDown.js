import { NavDropdown  } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const UsuarioDropDown = ({onLogout}) => {
    const { logout, credenciales } = useAuth()
    
    function handleLogout() {
        logout()
        onLogout()
    }

    return (
        <NavDropdown title={credenciales.nombre}>
            <NavDropdown.Item tag={Link} to='/login' onClick={handleLogout}>Salir</NavDropdown.Item>
        </NavDropdown>
    )
}

export default UsuarioDropDown
