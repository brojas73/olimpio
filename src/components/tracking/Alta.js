import { useState } from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useTareasExternas, useTareasExternasUpdate } from '../../context/TareasExternasContext'
import { STATUS_TAREA } from '../../context/TareasExternasContext'
import { useAuth } from '../../hooks/useAuth'

const Alta = ({onExito}) => {    
  const navigate = useNavigate()

  const { sucursales, sucursalActual, tiposTrabajo, tiposServicio } = useTareasExternas()
  const { agregaTareaExterna } = useTareasExternasUpdate()
  const { credenciales } = useAuth()

  const [tareaExterna, setTareaExterna] = useState({
    ticket: '',
    descripcion: '',
    id_tipo_trabajo: 0,
    id_sucursal_destino: 0,
    fecha_requerida: formateaFecha(new Date()),
    hora_requerida: formateaHora(new Date()),
    id_tipo_servicio: 0
  })

  function handleChange(e) {
    setTareaExterna(prevValue => ({...prevValue, [e.target.name]: e.target.value}))
  }

  function handleCancelar() {
    navigate(-1)
  }
  
  function onSubmit(event) {
    event.preventDefault()

    const nuevaTareaExterna = {
        id_tarea_externa: Math.floor(Math.random() * 100000000),
        id_sucursal_origen: sucursalActual,
        ticket: tareaExterna.ticket,
        descripcion: tareaExterna.descripcion,
        id_tipo_trabajo: tareaExterna.id_tipo_trabajo,
        id_sucursal_destino: tareaExterna.id_sucursal_destino,
        fecha_requerida: tareaExterna.fecha_requerida,
        hora_requerida: tareaExterna.hora_requerida,
        id_tipo_servicio: tareaExterna.id_tipo_servicio,
        id_estado_tarea: STATUS_TAREA.PENDIENTE_RECOLECCION,
        fecha_creacion: new Date(),
        usuario: credenciales.usuario,
        estado: 1
    }

    agregaTareaExterna(nuevaTareaExterna).then(data => {
        if (data.status === 200) {
            onExito(data.mensaje)
        }
    })
    navigate('/tracking/pendiente-recoleccion')
  }

  function formateaFecha(fecha) {
    const fechaTmp = new Date(fecha)
    const fechaFormateada = fechaTmp.getFullYear() + '-' + 
                            String((fechaTmp.getMonth() + 1)).padStart(2, '0') + '-' + 
                            String(fechaTmp.getDate()).padStart(2, '0') 
    return fechaFormateada
  }  

  function formateaHora(fecha) {
    const fechaTmp = new Date(fecha)
    const horaFormateada = String(fechaTmp.getHours()).padStart(2, '0') + ':' +
                           String(fechaTmp.getMinutes()).padStart(2, '0')
    return horaFormateada
  }

  return (
    <Container>
        <h2>Alta de Tarea Externa</h2>
        <Form onSubmit={onSubmit}>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label># de Ticket</Form.Label>
                    <Form.Control required
                        onChange={handleChange}
                        value={tareaExterna.ticket}
                        type='number'
                        placeholder="Escribe el número de ticket..." 
                        name='ticket' 
                    />
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Sucursal Destino</Form.Label>
                    <Form.Select
                        onChange={handleChange}
                        value={tareaExterna.id_sucursal_destino}
                        name='id_sucursal_destino' 
                    >
                        <option key={0} value={0}>Selecciona una...</option>
                        {
                            sucursales.filter(sucursal => sucursal.id_sucursal !== sucursalActual).map(sucursal => (
                                <option key={sucursal.id_sucursal} value={sucursal.id_sucursal}>{sucursal.nombre}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control required
                    onChange={handleChange}
                    value={tareaExterna.descripcion}
                    type='text'
                    placeholder="Escribe la descripción de la mercancía..." 
                    name='descripcion' 
                />
            </Form.Group>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Tipo de Trabajo</Form.Label>
                    <Form.Select
                        onChange={handleChange}
                        value={tareaExterna.id_tipo_trabajo}
                        name='id_tipo_trabajo' 
                    >
                     <option key={0} value={0}>Selecciona uno...</option>
                     {
                         tiposTrabajo.map(tipoTrabajo => (
                             <option key={tipoTrabajo.id_tipo_trabajo} value={tipoTrabajo.id_tipo_trabajo}>{tipoTrabajo.nombre}</option>
                         ))
                     }
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Tipo de Servicio</Form.Label>
                    <Form.Select
                        onChange={handleChange}
                        value={tareaExterna.id_tipo_servicio}
                        name='id_tipo_servicio' 
                    >
                     <option key={0} value={0}>Selecciona uno...</option>
                     {
                         tiposServicio.map(tipoServicio => (
                             <option key={tipoServicio.id_tipo_servicio} value={tipoServicio.id_tipo_servicio}>{tipoServicio.nombre}</option>
                         ))
                     }
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Fecha Requerida</Form.Label>
                    <Form.Control required
                        type='date'
                        onChange={handleChange}
                        value={tareaExterna.fecha_requerida}
                        name='fecha_requerida' 
                        min={formateaFecha(Date())}
                    />                    
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Hora Requerida</Form.Label>
                    <Form.Control required
                        type='time'
                        onChange={handleChange}
                        value={tareaExterna.hora_requerida}
                        name='hora_requerida' 
                    />
                </Form.Group>
            </Row>
            <Button variant='primary' onClick={handleCancelar}>
                Cancelar
            </Button>
            {" "}
            <Button variant='primary' type='submit'>
                Crear Tarea Externa
            </Button>
        </Form>
    </Container>
  )
}

export default Alta
