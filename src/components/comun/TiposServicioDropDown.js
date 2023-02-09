import { NavDropdown  } from "react-bootstrap"
import { useTareasExternas } from "../../context/TareasExternasContext"

const TiposServicioDropDown = ({onClick, title, titleOption}) => {
  const { tiposServicio } = useTareasExternas()

  return (
    <NavDropdown title={title}>
    {
      titleOption && (
        <NavDropdown.Item
          key={0}
          onClick={() => onClick(0)}
        >
          Tipo de Servicio
        </NavDropdown.Item>
      )
    }
    {
      tiposServicio.map(tipoServicio => (
          <NavDropdown.Item 
              key={tipoServicio.id_tipo_servicio}
              onClick={() => onClick(tipoServicio.id_tipo_servicio)}
          >
            {tipoServicio.nombre}
          </NavDropdown.Item>
      ))
    }
    </NavDropdown>
  )
}

export default TiposServicioDropDown
