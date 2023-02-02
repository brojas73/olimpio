import EstadosTarea from "../comun/EstadosTarea"
import { Navbar, Container } from 'react-bootstrap'

const Filtros = ({titulo}) => {
    return (
        <Navbar>
            <Container className="justify-content-end">
                <EstadosTarea />
            </Container>
        </Navbar>
    )
}

export default Filtros
