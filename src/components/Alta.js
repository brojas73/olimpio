import { useEffect, useState } from 'react'
import { useTareasExternas, useTareasExternasUpdate } from '../context/TareasExternasContext'
import { STATUS_TAREA } from '../context/TareasExternasContext'

const Alta = () => {
  const { sucursalActual } = useTareasExternas()
  const { agregaTareaExterna } = useTareasExternasUpdate()
  const { sucursales } = useTareasExternas()
  const { tiposTrabajo } = useTareasExternas()
  const { tiposServicio } = useTareasExternas()

  const [ticket, setTicket] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [tipoTrabajo, setTipoTrabajo] = useState(0)
  const [sucursalDestino, setSucursalDestino] = useState(0)
  const [fechaRequerida, setFechaRequerida] = useState(new Date())
  const [horaRequerida, setHoraRequerida] = useState('00:00')
  const [tipoServicio, setTipoServicio] = useState(0)
  
  function onSubmit(event) {
    event.preventDefault()

    const nuevaTareaExterna = {
        id: Math.floor(Math.random() * 100000000),
        ticket: ticket,
        descripcion: descripcion,
        tipoTrabajo: tipoTrabajo,
        sucursalOrigen: sucursalActual,
        sucursalDestino: sucursalDestino,
        fechaRequerida: fechaRequerida,
        horaRequerida: horaRequerida,
        tipoServicio: tipoServicio,
        status: STATUS_TAREA.PENDIENTE_RECOLECCION
    }

    console.log(nuevaTareaExterna)

    agregaTareaExterna(nuevaTareaExterna)

    setTicket('')
    setDescripcion('')
    setTipoTrabajo('')
    setSucursalDestino('')
    setFechaRequerida(formateaFecha(new Date()))
    setHoraRequerida(formateaHora(new Date()))
    setTipoServicio('')
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

  useEffect(() => {
    const fechaActual = new Date()
    setFechaRequerida(formateaFecha(fechaActual))
    setHoraRequerida(formateaHora(fechaActual))
  }, [ticket])

  return (
    <main className='main-container'>
        <div className='layout__body'>
            <h2>Alta de Trabajo Externo</h2>
        </div>
        <form onSubmit={onSubmit}>
            <div className='form__group'>
                <label># de Ticket</label>
                <input required
                    onChange={e => setTicket(e.target.value)} 
                    value={ticket}
                    type='text' 
                    name='ticket' 
                    placeholder='Escribe el número de ticket...' 
                />
            </div>
            <div className='form__group'>
                <label>Descripción</label>
                <input required 
                    onChange={e => setDescripcion(e.target.value)} 
                    value={descripcion}
                    type='text' 
                    name='descripcion' 
                    placeholder='Escribe la descripción de la marcancía...' 
                />
            </div>
            <div className='form__group'>
                <label>Tipo de Trabajo</label>
                <select required 
                    id='tipo_trabajo' 
                    name='tipo_trabajo' 
                    onChange={e => setTipoTrabajo(e.target.value)}
                >
                    <option key='0' value='0'>Selecciona el Tipo de Trabajo</option>
                    {
                        tiposTrabajo.map(tipoTrabajo => (
                            <option key={tipoTrabajo.id} value={tipoTrabajo.id}>{tipoTrabajo.nombre}</option>
                        ))
                    }
                </select>
            </div>
            <div className='form__group'>
                <label>Sucursal Destino</label>
                <select required 
                    id='sucursal_destino' 
                    name='sucursal_destino' 
                    onChange={(e => setSucursalDestino(e.target.value))}
                >
                    <option key='0' value='0'>Selecciona la Sucursal Destino</option>
                    {
                        // eslint-disable-next-line eqeqeq
                        sucursales.filter(sucursal => sucursal.id != sucursalActual).map(sucursal => (
                            <option key={sucursal.id} value={sucursal.id}>{sucursal.nombre}</option>
                        ))
                    }
                </select>
            </div>
            <div className='form__date'>
                <label>Fecha Requerida por el Cliente</label>
                <input required
                    type="date" 
                    name='fecha_requerida' 
                    id='fecha_requerida' 
                    value={fechaRequerida}
                    min={formateaFecha(Date())}
                    onChange={e => setFechaRequerida(e.target.value)}
                /> 
                <span> </span>
                <input required
                    type="time"
                    min='08:00'
                    max='20:00'
                    pattern='[0-9]{2}:[0-9]{2}'
                    value={horaRequerida}
                    onChange={e => setHoraRequerida(e.target.value)}
                />
            </div>
            <div className='form__group'>
                <label>Tipo de Servicio</label>
                <select required id='tipo_servicio' name='tipo_servicio' onChange={e => setTipoServicio(e.target.value)}>
                    <option key='0' value='0'>Selecciona el Tipo de Servicio</option>
                    {
                        tiposServicio.map(tipoServicio => (
                            <option key={tipoServicio.id} value={tipoServicio.id}>{tipoServicio.nombre}</option>        
                        ))
                    }
                </select>
            </div>
            <div className='form__action'>
                <button className='btn btn--main' type='submit'>Crear Trabajo Externo</button>
            </div>
        </form>
    </main>
  )
}

export default Alta
