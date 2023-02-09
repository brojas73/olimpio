import { NavDropdown  } from "react-bootstrap"
import { useTareasExternas } from "../../context/TareasExternasContext"

const SucursalesDropDown = ({onClick, title, titleOption}) => {
  const { sucursales } = useTareasExternas()

  return (
    <NavDropdown title={title}>
    {
      titleOption && (
        <NavDropdown.Item
          key={0}
          onClick={() => onClick(0)}
        >
          Sucursal
        </NavDropdown.Item>
      )
    }
    {
      sucursales.map(sucursal => (
          <NavDropdown.Item 
              key={sucursal.id_sucursal}
              onClick={() => onClick(sucursal.id_sucursal)}
          >
            {sucursal.nombre}
          </NavDropdown.Item>
      ))
    }
    </NavDropdown>
  )
}

export default SucursalesDropDown
