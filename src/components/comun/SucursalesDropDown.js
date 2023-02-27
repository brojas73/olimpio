import { NavDropdown  } from "react-bootstrap"
import { useTareasExternas } from "../../context/TareasExternasContext"

const SucursalesDropDown = ({onSelect, title, titleOption}) => {
  const { sucursales } = useTareasExternas()

  return (
    <NavDropdown title={title}>
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
