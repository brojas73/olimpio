const TareaExterna = ({tareaExterna, tituloBoton, accionBoton}, key) => {
    return (
    <div className='tarea_externa' key={key}>
        <h3>Ticket: {tareaExterna.ticket}</h3>
        <p>Sucursal Destino: {tareaExterna.sucursalDestino}</p>
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
