import React from 'react'
import { Link } from 'react-router-dom'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { useTareasExternas, useTareasExternasUpdate } from '../../context/TareasExternasContext'


const EstadosTarea = () => {
  const { estadoActual, estadosTarea, getEstadoTarea } = useTareasExternas()
  const { asignaEstadoActual } = useTareasExternasUpdate()

  return (
    <DropdownButton title={getEstadoTarea(estadoActual)}>
    {
      estadosTarea.map(estadoTarea => (
          <Dropdown.Item 
              as={Link}
              to={estadoTarea.url}
              key={estadoTarea.id_estado_tarea}
              onClick={e => asignaEstadoActual(estadoTarea.id_estado_tarea)}
          >
              {estadoTarea.nombre}
          </Dropdown.Item>
      ))
    }
    </DropdownButton>
  )
}

export default EstadosTarea
