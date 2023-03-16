/* eslint-disable eqeqeq */
import { STATUS_TAREA, TIPOS_SERVICIO, useTareasExternas } from "../../context/TareasExternasContext"
import { Button, Card, Col } from "react-bootstrap"
import { useAuth } from "../../hooks/useAuth"
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { formateaFecha, formateaFechaHora } from '../comun/Funciones'

const TareaExterna = ({tareaExterna, tituloContinuar, accionContinuar, accionBorrar }, key) => {
    const { estadoActual, getSucursal, getTipoServicio, getTipoTrabajo, getEstadoTarea, getUsuario } = useTareasExternas()
    const { esMaquila, esEncargado, esChofer, credenciales } = useAuth()

    function mostrarBotonAccionContinuar() {
        if (!accionContinuar)
            return false
        
        switch (parseInt(estadoActual)) {
            case STATUS_TAREA.PENDIENTE_RECOLECCION: 
                return esChofer()
            case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE: 
                return esEncargado() || esMaquila()
            case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE: 
                return esEncargado() || esMaquila()
            case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR: 
                return esChofer()
            case STATUS_TAREA.RECOLECTADO_PARA_ENTREGA:
                return esChofer()
            case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN: 
                return esEncargado() || esMaquila()
            case STATUS_TAREA.RECIBIDO_EN_SUCURSAL_ORIGEN: 
                return esEncargado() || esMaquila()
            default:
                break
        }
    }

    function mostrarBotonAcccionBorrar() {
        if (!accionBorrar)
            return false

        return (parseInt(estadoActual) === STATUS_TAREA.PENDIENTE_RECOLECCION && 
                tareaExterna.id_creado_por == credenciales.id_usuario &&
                esEncargado())
    }

    return (
        <Col>
            <Card border={tareaExterna.id_tipo_servicio == TIPOS_SERVICIO.EXPRESS ? 'danger' : ''} >
                <Card.Header>
                    <Card.Subtitle className="text-primary">{getEstadoTarea(tareaExterna.id_estado_tarea)}</Card.Subtitle>
                    <div className="d-flex justify-content-between align-items-center">
                        <Card.Title>Ticket: {tareaExterna.ticket.padStart(6, '0')}</Card.Title>
                        <Card.Subtitle>
                        { getSucursal(tareaExterna.id_sucursal_origen) }
                        { " " } <FaArrowAltCircleRight /> { " " }
                        { getSucursal(tareaExterna.id_sucursal_destino) }
                        </Card.Subtitle>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <small>{formateaFecha(tareaExterna.fecha_creacion)}</small>
                        <small>{getUsuario(tareaExterna.id_creado_por)}</small>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle>
                        {getTipoTrabajo(tareaExterna.id_tipo_trabajo)} { " - "}
                        {getTipoServicio(tareaExterna.id_tipo_servicio)}
                    </Card.Subtitle>
                    <Card.Text>
                        {tareaExterna.descripcion}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                    <div>
                        <small>Entregar: {formateaFechaHora(tareaExterna.fecha_requerida, tareaExterna.hora_requerida)}</small>
                    </div>
                    <div>
                        {
                            mostrarBotonAcccionBorrar() && (
                                <>
                                    <Button 
                                        size="sm" 
                                        onClick={() => accionBorrar(tareaExterna.id_tarea_externa)} 
                                        variant='danger'>
                                        Borrar
                                    </Button>
                                    <span> </span>
                                </>
                            )
                        }
                        {
                            mostrarBotonAccionContinuar() && (
                                <Button 
                                    size="sm"
                                    onClick={() => accionContinuar(tareaExterna.id_tarea_externa)}
                                    variant={tareaExterna.id_tipo_servicio == TIPOS_SERVICIO.EXPRESS ? 'danger' : 'primary'}
                                >
                                    {tituloContinuar}
                                </Button>
                            )
                        }
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default TareaExterna
