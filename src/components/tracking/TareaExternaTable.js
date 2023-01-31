import { STATUS_TAREA, useTareasExternas } from "../../context/TareasExternasContext"

const TareaExterna = ({tareaExterna, tituloBoton, accionBoton}, key) => {
    const { estadoActual, getSucursal, getTipoServicio, getTipoTrabajo } = useTareasExternas()

    function formateaFecha(fecha, hora) {
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
        const fechaTmp = new Date(Date.parse(fecha + 'T' + hora))
        return dias[fechaTmp.getDay()] + ', ' + 
               fechaTmp.getDate() + ' ' + 
               meses[fechaTmp.getMonth()] + ' ' +
               fechaTmp.getFullYear() + ' @ ' +
               hora 
    }

    return (
        <tr>
            <td>{tareaExterna.ticket}</td>
            <td>{tareaExterna.descripcion}</td>
            <td>{getTipoTrabajo(tareaExterna.tipoTrabajo)}</td>
            <td>{getSucursal(estadoActual === STATUS_TAREA.PENDIENTE_RECOLECCION ? tareaExterna.sucursalDestino : tareaExterna.sucursalOrigen)}</td>
            <td>{getTipoServicio(tareaExterna.tipoServicio)}</td> 
            <td>{formateaFecha(tareaExterna.fechaRequerida, tareaExterna.horaRequerida)}</td>
            <td>
            {
                tituloBoton && (
                    <button onClick={() => accionBoton(tareaExterna.id)} className="btn btn--main">
                        {tituloBoton}
                    </button>
                )
            }
            </td>
        </tr>
    )
}

export default TareaExterna
