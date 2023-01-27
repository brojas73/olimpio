import { useTareasExternas, useTareasExternasUpdate } from "../context/TareasExternasContext"

const Sucursales = ({onChange}) => {
  const { sucursales } = useTareasExternas()
  const { asignaSucursalActual } = useTareasExternasUpdate()
  return (
    <div>
        Sucursal: 
        <select id='sucursal_actual' name='sucursal_actual' onChange={e => asignaSucursalActual(e.target.value)}>
            {
                sucursales.map(sucursal => (
                    <option key={sucursal.id} value={sucursal.id}>{sucursal.nombre}</option>
                ))
            }
        
        </select>
    </div>

  )
}

export default Sucursales
