import { NavDropdown  } from "react-bootstrap"
import { useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"

const Sucursales = ({onChange}) => {
  const { sucursales, sucursalActual, getSucursal } = useTareasExternas()
  const { asignaSucursalActual } = useTareasExternasUpdate()

  return (
    <NavDropdown title={getSucursal(sucursalActual)}>
    {
        sucursales.map(sucursal => (
            <NavDropdown.Item 
                key={sucursal.id_sucursal}
                onClick={e => asignaSucursalActual(sucursal.id_sucursal)}
            >
              {sucursal.nombre}
            </NavDropdown.Item>
        ))
    }
    </NavDropdown>
  )
}

export default Sucursales