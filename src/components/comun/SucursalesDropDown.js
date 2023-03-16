import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLandmark } from "@fortawesome/free-solid-svg-icons"
import { NavDropdown  } from "react-bootstrap"
import { useTareasExternas } from "../../context/TareasExternasContext"

const SucursalesDropDown = ({onSelect, title, titleOption, showIcon}) => {
  const { sucursales } = useTareasExternas()

  return (
    <NavDropdown title={
      <span>
        { showIcon && (<FontAwesomeIcon icon={faLandmark} />) } {title}
      </span>
    }>
    {
      titleOption && (
        <NavDropdown.Item
          key={0}
          onClick={() => onSelect(0)}
        >
          
          Sucursal
        </NavDropdown.Item>
      )
    }
    {
      sucursales.map(sucursal => (
          <NavDropdown.Item 
              key={sucursal.id_sucursal}
              onClick={() => onSelect(sucursal.id_sucursal)}
          >
            {sucursal.nombre}
          </NavDropdown.Item>
      ))
    }
    </NavDropdown>
  )
}

export default SucursalesDropDown
