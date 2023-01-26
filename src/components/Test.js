import React from 'react'
import FechaRequerida from './FechaRequerida'

const Test = () => {
  const [fecha, setFecha] = React.useState(new Date())
  
  function onChange(fecha) {
    setFecha(fecha)
  }

  return (
    <div>
        <FechaRequerida selected={fecha} onChange={onChange}/>
    </div>
  )
}

export default Test
