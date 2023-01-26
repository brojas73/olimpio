import React from 'react'
import DateTimePicker from 'react-datetime-picker'

const FechaRequerida = () => {
  const fechaInicial = new Date()
  return (
    <div>
        <label>Fecha Requerida por el Cliente</label>
        <DateTimePicker clearIcon={null} selected={fechaInicial} format="dd-MM-yyyy"/>
    </div>
  )
}

export default FechaRequerida
