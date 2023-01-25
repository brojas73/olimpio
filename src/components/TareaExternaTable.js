import { useTareasExternasUpdate } from "../context/TareasExternasContext"

const TareaExterna = ({tareaExterna, tituloBoton, accionBoton}, key) => {
    const { getSucursal, getTipoServicio, getTipoTrabajo } = useTareasExternasUpdate()
    return (
        <tr>
            <td>{tareaExterna.ticket}</td>
            <td>{tareaExterna.descripcion}</td>
            <td>{getTipoTrabajo(tareaExterna.tipoTrabajo)}</td>
            <td>{getSucursal(tareaExterna.sucursalDestino)}</td>
            <td>{getTipoServicio(tareaExterna.tipoServicio)}</td>
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
