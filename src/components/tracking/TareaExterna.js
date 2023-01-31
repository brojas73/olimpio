import { useTareasExternasUpdate } from "../context/TareasExternasContext"

const TareaExterna = ({tareaExterna, tituloBoton, accionBoton}, key) => {
    const { getSucursal, getTipoServicio, getTipoTrabajo } = useTareasExternasUpdate()
    return (
        <div>
            <p>Ticket: {tareaExterna.ticket}</p>
            <p>Descripción: {tareaExterna.descripcion}</p>

            <p>Tipo de Trabajo: {tareaExterna.tipoTrabajo}</p>
            <p>Sucursal Destino: {tareaExterna.sucursalDestino}</p>
            <p>Tipo de Servicio: {tareaExterna.tipoServicio}</p>

            {
                tituloBoton && (
                    <button onClick={() => accionBoton(tareaExterna.id)} className="btn btn--main">
                        {tituloBoton}
                    </button>
                )
            }
        </div>
    )
}

export default TareaExterna
