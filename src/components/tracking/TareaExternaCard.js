import { STATUS_TAREA, TIPOS_SERVICIO, useTareasExternas } from "../../context/TareasExternasContext"
import { Button, Container, Card, Col } from "react-bootstrap"
import { useAuth } from "../../hooks/useAuth"

const TareaExterna = ({tareaExterna, tituloContinuar, accionContinuar, accionBorrar }, key) => {
    const { estadoActual, getSucursal, getTipoServicio, getTipoTrabajo } = useTareasExternas()
    const { esEncargado, esChofer } = useAuth()

    function formateaFecha(fecha, hora) {
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
        const fechaTmp = new Date(Date.parse(fecha.substring(0, 10) + 'T' + hora))
        return dias[fechaTmp.getDay()] + ', ' + 
               fechaTmp.getDate() + ' ' + 
               meses[fechaTmp.getMonth()] + ' ' +
               fechaTmp.getFullYear() + ' @ ' +
               hora.substring(0, 5) + ' hr'
    }

    function formateaFecha2(fecha) {
        const fechaTmp = new Date(fecha)
        const year = fechaTmp.getFullYear()
        const month = String(fechaTmp.getMonth()).padStart(2, '0')
        const date = String(fechaTmp.getDate()).padStart(2, '0')
        const hours = String(fechaTmp.getHours()).padStart(2, '0')
        const minutes = String(fechaTmp.getMinutes()).padStart(2, '0')
        const fechaStr = `${year}-${month}-${date}`
        const hora = `${hours}:${minutes}`
        return formateaFecha(fechaStr, hora)
    }

    function mostrarBotonAccionContinuar() {
        if (!accionContinuar)
            return false
        
        switch (estadoActual) {
            case STATUS_TAREA.PENDIENTE_RECOLECCION: return esChofer()
            case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE: return esEncargado()
            case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE: return esEncargado()
            case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR: return esChofer()
            case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN: return esChofer()
            case STATUS_TAREA.RECIBIDO_EN_SUCURSAL_ORIGEN: return esEncargado()
            default:
                break
        }
    }

    function mostrarBotonAcccionBorrar() {
        if (!accionBorrar)
            return false

        return (estadoActual === STATUS_TAREA.PENDIENTE_RECOLECCION && esEncargado())
    }

    return (
        <Col>
            <Card border={tareaExterna.id_tipo_servicio === TIPOS_SERVICIO.EXPRESS ? 'danger' : ''} >
                <Card.Header>
                    <Container className="d-flex justify-content-between align-items-center">
                        <Card.Title>Ticket: {tareaExterna.ticket}</Card.Title>
                        {
                            (estadoActual === STATUS_TAREA.PENDIENTE_RECOLECCION ||
                            estadoActual === STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN) ? (
                                <Card.Subtitle>
                                    Destino: {getSucursal(tareaExterna.id_sucursal_destino)}
                                </Card.Subtitle>
                            ) : (
                                <Card.Subtitle>
                                    Origen: {getSucursal(tareaExterna.id_sucursal_origen)}
                                </Card.Subtitle>
                            )
                        }
                    </Container>
                    <Container className="d-flex justify-content-between align-items-center">
                        <small>{formateaFecha2(tareaExterna.fecha_creacion)}</small>
                    </Container>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle>
                        {getTipoTrabajo(tareaExterna.id_tipo_trabajo)} { " - "}
                        {getTipoServicio(tareaExterna.id_tipo_servicio)}
                    </Card.Subtitle>
                    <Card.Text>
                        {tareaExterna.descripcion}
                    </Card.Text>
                    {
                        mostrarBotonAcccionBorrar() && (
                            <>
                                <Button onClick={() => accionBorrar(tareaExterna.id_tarea_externa)} variant='danger'>Borrar</Button>
                                <span> </span>
                            </>
                        )
                    }
                    {
                        mostrarBotonAccionContinuar() && (

                            <Button 
                                onClick={() => accionContinuar(tareaExterna.id_tarea_externa)}
                                variant={tareaExterna.id_tipo_servicio === TIPOS_SERVICIO.EXPRESS ? 'danger' : 'primary'}
                            >
                                {tituloContinuar}
                            </Button>
                        )
                    }
                </Card.Body>
                <Card.Footer>
                    <small>Entregar: {formateaFecha(tareaExterna.fecha_requerida, tareaExterna.hora_requerida)}</small>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default TareaExterna
