import { DropdownButton, Dropdown } from "react-bootstrap"
import { useTareasExternas, useTareasExternasUpdate } from "../../context/TareasExternasContext"

const Sucursales = ({onChange}) => {
  const { sucursales, sucursalActual, getSucursal } = useTareasExternas()
  const { asignaSucursalActual } = useTareasExternasUpdate()

  return (
    <DropdownButton title={getSucursal(sucursalActual)} className="justify-content-start">
    {
      sucursales.map(sucursal => (
        <Dropdown.Item 
            key={sucursal.id_sucursal}
            onClick={e => asignaSucursalActual(sucursal.id_sucursal)}
        >
            {sucursal.nombre}
        </Dropdown.Item>
      ))
    }
    </DropdownButton>
  )
}

export default Sucursales
