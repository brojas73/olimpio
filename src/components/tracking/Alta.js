import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTareasExternas, useTareasExternasUpdate } from '../../context/TareasExternasContext'
import { STATUS_TAREA } from '../../context/TareasExternasContext'
import Sucursales from '../comun/Sucursales'

const Alta = () => {    
  const navigate = useNavigate()

  const { sucursalActual } = useTareasExternas()
  const { agregaTareaExterna } = useTareasExternasUpdate()
  const { sucursales } = useTareasExternas()
  const { tiposTrabajo } = useTareasExternas()
  const { tiposServicio } = useTareasExternas()

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
        ticket: tareaExterna.ticket,
        descripcion: tareaExterna.descripcion,
        id_tipo_trabajo: tareaExterna.id_tipo_trabajo,
        id_sucursal_origen: sucursalActual,
        id_sucursal_destino: tareaExterna.id_sucursal_destino,
        fecha_requerida: tareaExterna.fecha_requerida,
        hora_requerida: tareaExterna.hora_requerida,
        id_tipo_servicio: tareaExterna.id_tipo_servicio,
        id_estado_tarea: STATUS_TAREA.PENDIENTE_RECOLECCION,
        estado: 1
    }

    agregaTareaExterna(nuevaTareaExterna)
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
    <main className='main-container'>
        <div className='filtros-container'>
            <Sucursales />
        </div>
        <div className='layout__body'>
            <h2>Alta de Trabajo Externo</h2>
        </div>
        <form onSubmit={onSubmit}>
            <div className='form__group'>
                <label># de Ticket</label>
                <input required
                    onChange={handleChange}
                    value={tareaExterna.ticket}
                    type='text' 
                    name='ticket' 
                    placeholder='Escribe el número de ticket...' 
                />
            </div>
            <div className='form__group'>
                <label>Descripción</label>
                <input required 
                    onChange={handleChange}
                    value={tareaExterna.descripcion}
                    type='text' 
                    name='descripcion' 
                    placeholder='Escribe la descripción de la marcancía...' 
                />
            </div>
            <div className='form__group'>
                <label>Tipo de Trabajo</label>
                <select required 
                    id='id_tipo_trabajo' 
                    name='id_tipo_trabajo' 
                    onChange={handleChange}
                    value={tareaExterna.id_tipo_trabajo}
                >
                    <option key='0' value='0'>Selecciona el Tipo de Trabajo</option>
                    {
                        tiposTrabajo.map(tipoTrabajo => (
                            <option key={tipoTrabajo.id_tipo_trabajo} value={tipoTrabajo.id_tipo_trabajo}>{tipoTrabajo.nombre}</option>
                        ))
                    }
                </select>
            </div>
            <div className='form__group'>
                <label>Sucursal Destino</label>
                <select required 
                    id='id_sucursal_destino' 
                    name='id_sucursal_destino' 
                    onChange={handleChange}
                    value={tareaExterna.id_sucursal_destino}
                >
                    <option key='0' value='0'>Selecciona la Sucursal Destino</option>
                    {
                        sucursales.filter(sucursal => sucursal.id_sucursal !== sucursalActual).map(sucursal => (
                            <option key={sucursal.id_sucursal} value={sucursal.id_sucursal}>{sucursal.nombre}</option>
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
                    value={tareaExterna.fecha_requerida}
                    min={formateaFecha(Date())}
                    onChange={handleChange}
                /> 
                <span> </span>
                <input required
                    type="time"
                    name='hora_requerida'
                    id='hora_requerida'
                    min='08:00'
                    max='20:00'
                    pattern='[0-9]{2}:[0-9]{2}'
                    value={tareaExterna.hora_requerida}
                    onChange={handleChange}
                />
            </div>
            <div className='form__group'>
                <label>Tipo de Servicio</label>
                <select required 
                    id='id_tipo_servicio' 
                    name='id_tipo_servicio' 
                    onChange={handleChange}
                >
                    <option key='0' value='0'>Selecciona el Tipo de Servicio</option>
                    {
                        tiposServicio.map(tipoServicio => (
                            <option key={tipoServicio.id_tipo_servicio} value={tipoServicio.id_tipo_servicio}>{tipoServicio.nombre}</option>        
                        ))
                    }
                </select>
            </div>
            <div className='form__action'>
                <button className='btn btn--delete' onClick={handleCancelar}>Cancelar</button>
                <button className='btn btn--add' type='submit'>Crear Trabajo Externo</button>
            </div>
        </form>
    </main>
  )
}

export default Alta
