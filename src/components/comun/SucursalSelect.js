import { Form } from 'react-bootstrap'
import { useTareasExternas } from '../../context/TareasExternasContext'

const SucursalSelect = ({onChange, name, value, label, filtraSucursalActual }) => {
    const { sucursales, sucursalActual } = useTareasExternas()

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Select required
                onChange={onChange}
                value={value}
                name={name}
            >
                <option key={0} value="">Selecciona una...</option>
                {
                    sucursales.filter(sucursal => (!filtraSucursalActual || sucursal.id_sucursal !== parseInt(sucursalActual))).map(sucursal => (
                        <option key={sucursal.id_sucursal} value={sucursal.id_sucursal}>{sucursal.nombre}</option>
                    ))
                }
            </Form.Select>
        </>
    )
}

export default SucursalSelect
