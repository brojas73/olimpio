import { Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import { useTareasExternas } from '../../context/TareasExternasContext'


const EstadosTareaDropDown = ({onClick, title, titleOption}) => {
  const { estadosTarea } = useTareasExternas()

  // This is to avoid a warning when process is just loaded about the title required field in the
  // DropDownButton below
  if (estadosTarea.length < 1)
    return

  return (
    <NavDropdown title={title}>
    {
      titleOption && (
        <NavDropdown.Item
          key={0}
          onClick={() => onClick(0)}
        >
          Estado
        </NavDropdown.Item>
      )
    }
    {
      estadosTarea.map(estadoTarea => (
          <NavDropdown.Item 
              as={Link}
              to={estadoTarea.url}
              key={estadoTarea.id_estado_tarea}
              onClick={() => onClick(estadoTarea.id_estado_tarea)}
          >
            {estadoTarea.nombre}
          </NavDropdown.Item>
      ))
    }
    </NavDropdown>
  )
}

export default EstadosTareaDropDown
