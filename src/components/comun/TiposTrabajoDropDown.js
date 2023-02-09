import { NavDropdown  } from "react-bootstrap"
import { useTareasExternas } from "../../context/TareasExternasContext"

const TiposTrabajoDropDown = ({onClick, title, titleOption}) => {
  const { tiposTrabajo } = useTareasExternas()

  return (
    <NavDropdown title={title}>
    {
      titleOption && (
        <NavDropdown.Item
          key={0}
          onClick={() => onClick(0)}
        >
          Tipo de Trabajo
        </NavDropdown.Item>
      )
    }
    {
      tiposTrabajo.map(tipoTrabajo => (
          <NavDropdown.Item 
              key={tipoTrabajo.id_tipo_trabajo}
              onClick={() => onClick(tipoTrabajo.id_tipo_trabajo)}
          >
            {tipoTrabajo.nombre}
          </NavDropdown.Item>
      ))
    }
    </NavDropdown>
  )
}

export default TiposTrabajoDropDown
