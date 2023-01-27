import { useTareasExternas, useTareasExternasUpdate } from "../context/TareasExternasContext"

const Sucursales = ({onChange}) => {
  const { sucursales, sucursalActual, getSucursal } = useTareasExternas()
  const { asignaSucursalActual } = useTareasExternasUpdate()

  function onClick(sucursal) {
    asignaSucursalActual(sucursal)
  }

  return (
    <div className="dropdown">
        <span>Sucursal: </span>
        <button className="dropbtn">{getSucursal(sucursalActual)}</button>
        <div className="dropdown-content">
          {
            sucursales.map(sucursal => (
              <a href='#' key={sucursal.id} onClick={e => onClick(sucursal.id)}>{sucursal.nombre}</a>
            ))
          }
        </div>
    </div>
  )
}

export default Sucursales
