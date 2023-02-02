// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faCheck, faMinus  } from "@fortawesome/fontawesome-free-solid"
import { STATUS_TAREA, TIPOS_SERVICIO, useTareasExternas } from "../../context/TareasExternasContext"
import { Button, Card, CloseButton, Col } from "react-bootstrap"

const TareaExterna = ({tareaExterna, accionContinuar, accionBorrar, tituloBorrar, tituloContinuar}, key) => {
    const { estadoActual, getSucursal, getTipoServicio, getTipoTrabajo } = useTareasExternas()

    function formateaFecha(fecha, hora) {
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
        const fechaTmp = new Date(Date.parse(fecha.substring(0, 10) + 'T' + hora))
        return dias[fechaTmp.getDay()] + ', ' + 
               fechaTmp.getDate() + ' ' + 
               meses[fechaTmp.getMonth()] + ' ' +
               fechaTmp.getFullYear() + ' @ ' +
               hora.substring(0, 5)
    }
    return (
        <Col>
            <Card border={tareaExterna.id_tipo_servicio === TIPOS_SERVICIO.EXPRESS ? 'danger' : ''} >
                <Card.Header>
                    {
                        estadoActual === STATUS_TAREA.PENDIENTE_RECOLECCION ? (
                            <>
                                <Card.Title>
                                    {
                                        tituloBorrar && (
                                            <CloseButton onClick={() => accionBorrar(tareaExterna.id_tarea_externa)}/> 
                                        )
                                    }
                                    Destino: {getSucursal(tareaExterna.id_sucursal_destino)}
                                </Card.Title>
                            </>
                        ) : (
                            <Card.Title>Origen: {getSucursal(tareaExterna.id_sucursal_origen)}</Card.Title>
                        )
                    }
                </Card.Header>
                <Card.Body>
                    <Card.Title>Ticket: {tareaExterna.ticket}</Card.Title>
                    <Card.Subtitle>
                        {getTipoTrabajo(tareaExterna.id_tipo_trabajo)} { " - " }
                        {getTipoServicio(tareaExterna.id_tipo_servicio)}
                    </Card.Subtitle>
                    <Card.Text>
                        {tareaExterna.descripcion}
                    </Card.Text>
                    {
                        // tituloBorrar && (
                        //     <>
                        //         <Button  variant='danger'>{tituloBorrar}</Button>
                        //         <span> </span>
                        //     </>
                        // )
                    }
                    {
                        tituloContinuar && (
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
                    <small>{formateaFecha(tareaExterna.fecha_requerida, tareaExterna.hora_requerida)}</small>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default TareaExterna
