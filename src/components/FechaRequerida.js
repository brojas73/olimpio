const FechaRequerida = () => {
  const fechaInicial = new Date()

  function formateaFecha(fecha) {
    return fecha.getFullYear() + '-' + String((fecha.getMonth() + 1)).padStart(2, '0') + '-' + String(fecha.getDate()).padStart(2, '0') + 'T' +
           String(fecha.getHours()).padStart(2, '0') + ':' + String(fecha.getMinutes()).padStart(2, '0')
  }
  
  function onChange(e) {

    console.log('onChange', e.target.value)
  }

  console.log('fechaInicial', formateaFecha(fechaInicial))

  return (
    <>
      <label>Fecha Requerida por el Cliente</label>
      <input type="datetime-local" 
             name='fecha_requerida' 
             id='fecha_requerida' 
             step=''
             value={formateaFecha(fechaInicial)}
             min={formateaFecha(fechaInicial)}
             onChange={onChange}
      />
    </>
  )
}

export default FechaRequerida
