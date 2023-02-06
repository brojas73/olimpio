import { useState } from "react"
import { Alert } from 'react-bootstrap'

const AutoHideAlert = () => {
    const [mostrar, setMostrar] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const [tipo, setTipo] = useState('success')

    function muestraAlerta(mensaje, tipoAlerta='success') {
        setMensaje(mensaje)
        setMostrar(true)
        setTipo(tipoAlerta)
        window.setTimeout(() => {
          setMostrar(false)
        }, 2000)
    }

    return (
        <Alert muestraAlerta={muestraAlerta} show={mostrar} variant={tipo} onClose={() => setMostrar(false)} dismissible>
            {mensaje}
        </Alert>
    )
}

export default AutoHideAlert
