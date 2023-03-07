import { Form } from 'react-bootstrap'
import { useTareasExternas } from '../../context/TareasExternasContext'

const TipoServicioSelect = ({onChange, name, value, label}) => {
    const { tiposServicio } = useTareasExternas()

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Select required
                onChange={onChange}
                value={value}
                name={name}
            >
                <option key={0} value="">Selecciona uno...</option>
                {
                    tiposServicio.map(tipoServicio => (
                        <option key={tipoServicio.id_tipo_servicio} value={tipoServicio.id_tipo_servicio}>{tipoServicio.nombre}</option>
                    ))
                }
            </Form.Select>
        </>
    )
}

export default TipoServicioSelect
