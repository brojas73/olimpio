import { NavDropdown  } from "react-bootstrap"
import { useTareasExternas } from "../../context/TareasExternasContext"

const TiposServicioDropDown = ({onSelect, title, titleOption}) => {
  const { tiposServicio } = useTareasExternas()

  return (
    <NavDropdown title={title}>
    {
      titleOption && (
        <NavDropdown.Item
          key={0}
          onClick={() => onSelect(0)}
        >
          Tipo de Servicio
        </NavDropdown.Item>
      )
    }
    {
      tiposServicio.map(tipoServicio => (
          <NavDropdown.Item 
              key={tipoServicio.id_tipo_servicio}
              onClick={() => onSelect(tipoServicio.id_tipo_servicio)}
          >
            {tipoServicio.nombre}
          </NavDropdown.Item>
      ))
    }
    </NavDropdown>
  )
}

export default TiposServicioDropDown
