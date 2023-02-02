import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faMinus  } from "@fortawesome/fontawesome-free-solid"
import { STATUS_TAREA, useTareasExternas } from "../../context/TareasExternasContext"
import { Button } from "react-bootstrap"

const TareaExterna = ({tareaExterna, tituloContinuar, tituloBorrar, accionContinuar, accionBorrar}, key) => {
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
        <tr>
            <td>{tareaExterna.ticket}</td>
            <td>{tareaExterna.descripcion}</td>
            <td>{getTipoTrabajo(tareaExterna.id_tipo_trabajo)}</td>
            <td>{getSucursal(estadoActual === STATUS_TAREA.PENDIENTE_RECOLECCION ? tareaExterna.id_sucursal_destino : tareaExterna.id_sucursal_origen)}</td>
            <td>{getTipoServicio(tareaExterna.id_tipo_servicio)}</td> 
            <td>{formateaFecha(tareaExterna.fecha_requerida, tareaExterna.hora_requerida)}</td>
            <td align="center">
            {
                accionBorrar && (
                    <>
                        <Button onClick={() => accionBorrar(tareaExterna.id_tarea_externa)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <span> </span>
                    </>
                )
            }
            {
                accionContinuar && (
                    <>
                        <Button onClick={() => accionContinuar(tareaExterna.id_tarea_externa)}>
                            <FontAwesomeIcon icon={faCheck} />
                        </Button>
                    </>
                )
            }
            </td>
        </tr>
    )
}

export default TareaExterna
