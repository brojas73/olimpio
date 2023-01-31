import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTareasExternas, useTareasExternasUpdate } from '../../context/TareasExternasContext'


const EstadosTarea = () => {
  const { estadoActual, estadosTarea, getEstadoTarea } = useTareasExternas()
  const { asignaEstadoActual } = useTareasExternasUpdate()

  function onClick(id_estado_tarea) {
    asignaEstadoActual(id_estado_tarea)
  }

  return (
    <div className="dropdown">
        <span>Estados: </span>
        <button className="dropbtn">{getEstadoTarea(estadoActual)}</button>
        <div className="dropdown-content">
          {
            estadosTarea.map(estadoTarea => (
              <NavLink to={estadoTarea.url} key={estadoTarea.id_estado_tarea} onClick={e => onClick(estadoTarea.id_estado_tarea)}>{estadoTarea.nombre}</NavLink>
            ))
          }
        </div>
    </div>  )
}

export default EstadosTarea
