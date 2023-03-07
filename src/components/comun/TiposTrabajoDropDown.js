import { NavDropdown  } from "react-bootstrap"
import { useTareasExternas } from "../../context/TareasExternasContext"

const TiposTrabajoDropDown = ({onSelect, title, titleOption}) => {
  const { tiposTrabajo } = useTareasExternas()

  return (
    <NavDropdown title={title}>
    {
      titleOption && (
        <NavDropdown.Item
          key={0}
          onClick={() => onSelect(0)}
        >
          Tipo de Trabajo
        </NavDropdown.Item>
      )
    }
    {
      tiposTrabajo.map(tipoTrabajo => (
          <NavDropdown.Item 
              key={tipoTrabajo.id_tipo_trabajo}
              onClick={() => onSelect(tipoTrabajo.id_tipo_trabajo)}
          >
            {tipoTrabajo.nombre}
          </NavDropdown.Item>
      ))
    }
    </NavDropdown>
  )
}

export default TiposTrabajoDropDown
