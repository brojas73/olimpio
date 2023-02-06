import React from 'react'
import { Link } from 'react-router-dom'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { useTareasExternas, useTareasExternasUpdate } from '../../context/TareasExternasContext'


const EstadosTarea = () => {
  const { estadoActual, estadosTarea, getEstadoTarea } = useTareasExternas()
  const { asignaEstadoActual } = useTareasExternasUpdate()

  // This is to avoid a warning when process is just loaded about the title required field in the
  // DropDownButton below
  if (estadosTarea.length < 1)
    return

  return (
    <DropdownButton title={getEstadoTarea(estadoActual)} variant='light'>
    {
      estadosTarea.map(estadoTarea => (
          <Dropdown.Item 
              as={Link}
              to={estadoTarea.url}
              key={estadoTarea.id_estado_tarea}
              onClick={() => asignaEstadoActual(estadoTarea.id_estado_tarea)}
          >
              {estadoTarea.nombre}
          </Dropdown.Item>
      ))
    }
    </DropdownButton>
  )
}

export default EstadosTarea
