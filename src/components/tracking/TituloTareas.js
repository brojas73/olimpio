import { useNavigate } from "react-router-dom"
import { Navbar, Container, Button, Badge } from 'react-bootstrap'
import { useTareasExternas } from "../../context/TareasExternasContext"
import { STATUS_TAREA } from "../../context/TareasExternasContext"
import { useAuth } from "../../hooks/useAuth"

const TituloTareas = ({titulo, renglones}) => {
    const navigate = useNavigate()
    const { estadoActual } = useTareasExternas()
    const { esEncargado } = useAuth()

    function onClick() {
        navigate('/tracking/nueva-tarea')
    }

    return (
        <Navbar>
            <Container className="justify-content-start">
                <Button variant="dark" size="lg">
                    {titulo} { " "}
                    <Badge bg="primary">{renglones}</Badge>
                </Button>
            </Container>
            {
                (esEncargado() && estadoActual === STATUS_TAREA.PENDIENTE_RECOLECCION) && (
                    <Container className="justify-content-end">
                        <Button onClick={onClick} variant='dark' size="sm">
                            Nueva Tarea
                        </Button>
                    </Container>
                )
            }
        </Navbar>
    )
}

export default TituloTareas
