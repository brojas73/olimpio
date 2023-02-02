import { useNavigate } from "react-router-dom"
import EstadosTarea from "../comun/EstadosTarea"
import Sucursales from "../comun/Sucursales"
import { Navbar, Container, Button } from 'react-bootstrap'

const Filtros = ({titulo}) => {
    const navigate = useNavigate()

    function onClick() {
        navigate('/tracking/alta')
    }

    return (
        <>
            <Navbar>
                <Container className="justify-content-start">
                    <Sucursales />
                </Container>
                <Container className="justify-content-end">
                    <EstadosTarea />
                </Container>
            </Navbar>
            <Navbar>
                <Container className="justify-content-start">
                    <h3>{titulo}</h3>
                </Container>
                <Container className="justify-content-end">
                    <Button onClick={onClick}>
                        Agregar Tarea
                    </Button>
                </Container>
            </Navbar>
        </>
    )
}

export default Filtros
