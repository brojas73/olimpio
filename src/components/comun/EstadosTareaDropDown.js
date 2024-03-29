import { Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import { useTareasExternas } from '../../context/TareasExternasContext'
import { STATUS_TAREA } from '../../context/TareasExternasContext'


const EstadosTareaDropDown = ({onSelect, title }) => {
  const { estadosTarea } = useTareasExternas()

  // This is to avoid a warning when process is just loaded about the title required field in the
  // DropDownButton below
  // if (estadosTarea.length < 1)
  //   return

  return (
    <NavDropdown title={title}>
    {
      estadosTarea
        .filter(estadoTarea => estadoTarea.id_estado_tarea !== STATUS_TAREA.RECIBIDO_EN_SUCURSAL_ORIGEN)
        .map(estadoTarea => (
          <NavDropdown.Item 
              as={Link}
              to={estadoTarea.url}
              key={estadoTarea.id_estado_tarea}
              onClick={() => onSelect(estadoTarea.id_estado_tarea)}
          >
            {estadoTarea.nombre}
          </NavDropdown.Item>
      ))
    }
    </NavDropdown>
  )
}

export default EstadosTareaDropDown
