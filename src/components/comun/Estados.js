import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTareasExternas, useTareasExternasUpdate } from '../../context/TareasExternasContext'


const Estados = () => {
  const { estadoActual, estados, getEstado } = useTareasExternas()
  const { asignaEstadoActual } = useTareasExternasUpdate()

  function onClick(id) {
    asignaEstadoActual(id)
  }

  return (
    <div className="dropdown">
        <span>Estados: </span>
        <button className="dropbtn">{getEstado(estadoActual)}</button>
        <div className="dropdown-content">
          {
            estados.map(estado => (
              <NavLink to={estado.url} key={estado.id} onClick={e => onClick(estado.id)}>{estado.nombre}</NavLink>
            ))
          }
        </div>
    </div>  )
}

export default Estados
