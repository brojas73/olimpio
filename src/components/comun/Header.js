import { Link } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"

const Header = ({isLoggedIn, onLogout}) => {
    function handleLogout() {
        onLogout()
    }

    return (
        <Navbar bg='dark' variant="dark"> 
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Olimpio
                </Navbar.Brand>
                <Navbar.Toggle />
                {
                    isLoggedIn && (
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Link to='/login' onClick={() => handleLogout()}>
                                Salir
                            </Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                    )
                } 
            </Container>
        </Navbar>
    )
}

export default Header
