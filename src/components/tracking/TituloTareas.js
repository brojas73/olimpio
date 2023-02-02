import { useNavigate } from "react-router-dom"
import { Navbar, Container, Button } from 'react-bootstrap'

const TituloTareas = ({titulo}) => {
    const navigate = useNavigate()

    function onClick() {
        navigate('/tracking/alta')
    }

    return (
        <Navbar>
            <Container className="justify-content-start">
                <h3>{titulo}</h3>
            </Container>
            <Container className="justify-content-end">
                <Button onClick={onClick} variant='dark'>
                    Nueva Tarea Externa
                </Button>
            </Container>
        </Navbar>
    )
}

export default TituloTareas
