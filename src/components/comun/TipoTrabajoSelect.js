import { Form } from 'react-bootstrap'
import { useTareasExternas } from '../../context/TareasExternasContext'

const TipoTrabajoSelect = ({onChange, name, value, label}) => {
    const { tiposTrabajo } = useTareasExternas()

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
                    tiposTrabajo.map(tipoTrabajo => (
                        <option key={tipoTrabajo.id_tipo_trabajo} value={tipoTrabajo.id_tipo_trabajo}>{tipoTrabajo.nombre}</option>
                    ))
                }
            </Form.Select>
        </>
    )
}

export default TipoTrabajoSelect
