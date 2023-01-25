import { useState } from 'react'
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
  const [tipoTrabajo, setTipoTrabajo] = useState('')
  const [sucursalDestino, setSucursalDestino] = useState('')
  const [fechaRequerida, setFechaRequerida] = useState('')
  const [tipoServicio, setTipoServicio] = useState('')

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
        tipoServicio: tipoServicio,
        status: STATUS_TAREA.PENDIENTE_RECOLECCION
    }

    agregaTareaExterna(nuevaTareaExterna)

    setTicket('')
    setDescripcion('')
    setTipoTrabajo('')
    setSucursalDestino('')
    setFechaRequerida('')
    setTipoServicio('')
  }

  return (
    <main className='main-container'>
        <div className='container layout__body'>
            <h2>Alta de Trabajo Externo</h2>
        </div>
        <form onSubmit={onSubmit} className='form__group'>
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
                <select id='tipo_trabajo' name='tipo_trabajo' onChange={e => setTipoTrabajo(e.target.value)}>
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
                <select id='sucursal_destino' name='sucursal_destino' onChange={(e => setSucursalDestino(e.target.value))}>
                    <option value='0'>Selecciona la Sucursal Destino</option>
                    {
                        sucursales.filter(sucursal => sucursal.id !== sucursalActual.id).map(sucursal => (
                            <option value={sucursal.id}>{sucursal.nombre}</option>
                        ))
                    }
                </select>
            </div>
            <div className='form__group'>
                <label>Fecha Requerida por el Cliente</label>
                <input required
                    onChange={e => setFechaRequerida(e.target.value)}  
                    value={fechaRequerida}
                    type='text' 
                    name='fecha_requerida' 
                    placeholder='Captura la fecha requerida por el cliente...' 
                />
            </div>
            <div className='form__group'>
                <label>Tipo de Servicio</label>
                <select id='tipo_servicio' name='tipo_servicio' onChange={e => setTipoServicio(e.target.value)}>
                    <option value='0'>Selecciona el Tipo de Servicio</option>
                    {
                        tiposServicio.map(tipoServicio => (
                            <option value={tipoServicio.id}>{tipoServicio.nombre}</option>        
                        ))
                    }
                </select>
            </div>
            <div className='form__action'>
                <button className='btn btn--main' type='submit'>Dar de Alta</button>
            </div>
        </form>
    </main>
  )
}

export default Alta
