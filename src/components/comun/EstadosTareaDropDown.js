import { Nav, NavDropdown } from 'react-bootstrap'
import { useTareasExternas, useTareasExternasUpdate } from '../../context/TareasExternasContext'


const EstadosTareaDropDown = () => {
  const { estadoActual, estadosTarea, getEstadoTarea } = useTareasExternas()
  const { asignaEstadoActual } = useTareasExternasUpdate()

  // This is to avoid a warning when process is just loaded about the title required field in the
  // DropDownButton below
  if (estadosTarea.length < 1)
    return

  return (
    <Nav className="justify-content-end flex-grow-1 pe-3">
      <NavDropdown title={getEstadoTarea(estadoActual)}>
      {
        estadosTarea.map(estadoTarea => (
          <NavDropdown.Item 
              key={estadoTarea.id_estado_tarea}
              onClick={() => asignaEstadoActual(estadoTarea.id_estado_tarea)}
          >
            {estadoTarea.nombre}
          </NavDropdown.Item>
        ))
      }
      </NavDropdown>
    </Nav>
  )
}

export default EstadosTareaDropDown
