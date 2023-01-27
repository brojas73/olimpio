import React, { useContext, useState } from "react";

const TareasExternasContext = React.createContext()
const TareasExternasUpdateContext = React.createContext()

export const STATUS_TAREA = {
    PENDIENTE_RECOLECCION: '1',
    RECOLECTADO_PARA_ATENDERSE: '2',
    RECIBIDO_PARA_ATENDERSE: '3',
    TERMINADO_PARA_RECOLECTAR: '4',
    RECOLECTADO_PARA_ENTREGA: '5',
    ENTREGADO_A_SUCURSAL_ORIGEN: '6'
} 

const tareasIniciales = [
    {id: 1,  ticket: '11111', descripcion: 'descripcion 1', tipoTrabajo: '1', sucursalOrigen: '2', sucursalDestino: '1', fechaRequerida: '2023-01-25', horaRequerida: '20:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 2,  ticket: '22222', descripcion: 'descripcion 2', tipoTrabajo: '2', sucursalOrigen: '1', sucursalDestino: '2', fechaRequerida: '2023-01-26', horaRequerida: '08:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 3,  ticket: '33333', descripcion: 'descripcion 3', tipoTrabajo: '3', sucursalOrigen: '1', sucursalDestino: '3', fechaRequerida: '2023-01-27', horaRequerida: '09:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 4,  ticket: '44444', descripcion: 'descripcion 4', tipoTrabajo: '4', sucursalOrigen: '1', sucursalDestino: '4', fechaRequerida: '2023-01-28', horaRequerida: '10:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 5,  ticket: '55555', descripcion: 'descripcion 5', tipoTrabajo: '1', sucursalOrigen: '2', sucursalDestino: '1', fechaRequerida: '2023-01-29', horaRequerida: '11:30', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 6,  ticket: '66666', descripcion: 'descripcion 6', tipoTrabajo: '2', sucursalOrigen: '3', sucursalDestino: '2', fechaRequerida: '2023-01-30', horaRequerida: '12:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 7,  ticket: '77777', descripcion: 'descripcion 7', tipoTrabajo: '3', sucursalOrigen: '4', sucursalDestino: '3', fechaRequerida: '2023-01-31', horaRequerida: '13:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 8,  ticket: '88888', descripcion: 'descripcion 8', tipoTrabajo: '4', sucursalOrigen: '3', sucursalDestino: '4', fechaRequerida: '2023-02-01', horaRequerida: '14:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 9,  ticket: '99999', descripcion: 'descripcion 9', tipoTrabajo: '1', sucursalOrigen: '4', sucursalDestino: '1', fechaRequerida: '2023-02-02', horaRequerida: '15:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 11, ticket: 'AAAAA', descripcion: 'descripcion A', tipoTrabajo: '1', sucursalOrigen: '2', sucursalDestino: '1', fechaRequerida: '2023-02-03', horaRequerida: '16:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 12, ticket: 'BBBBB', descripcion: 'descripcion B', tipoTrabajo: '2', sucursalOrigen: '1', sucursalDestino: '2', fechaRequerida: '2023-02-04', horaRequerida: '17:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 13, ticket: 'CCCCC', descripcion: 'descripcion C', tipoTrabajo: '3', sucursalOrigen: '1', sucursalDestino: '3', fechaRequerida: '2023-02-05', horaRequerida: '18:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 14, ticket: 'DDDDD', descripcion: 'descripcion D', tipoTrabajo: '4', sucursalOrigen: '1', sucursalDestino: '4', fechaRequerida: '2023-02-06', horaRequerida: '19:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 15, ticket: 'EEEEE', descripcion: 'descripcion E', tipoTrabajo: '1', sucursalOrigen: '2', sucursalDestino: '1', fechaRequerida: '2023-02-07', horaRequerida: '20:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 16, ticket: 'FFFFF', descripcion: 'descripcion F', tipoTrabajo: '2', sucursalOrigen: '3', sucursalDestino: '2', fechaRequerida: '2023-02-08', horaRequerida: '19:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 17, ticket: 'GGGGG', descripcion: 'descripcion G', tipoTrabajo: '3', sucursalOrigen: '4', sucursalDestino: '3', fechaRequerida: '2023-02-09', horaRequerida: '18:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 18, ticket: 'HHHHH', descripcion: 'descripcion H', tipoTrabajo: '4', sucursalOrigen: '3', sucursalDestino: '4', fechaRequerida: '2023-02-10', horaRequerida: '17:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 19, ticket: 'IIIII', descripcion: 'descripcion I', tipoTrabajo: '1', sucursalOrigen: '4', sucursalDestino: '1', fechaRequerida: '2023-02-11', horaRequerida: '16:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
]

export function useTareasExternas() {
    return useContext(TareasExternasContext)
}

export function useTareasExternasUpdate() {
    return useContext(TareasExternasUpdateContext)
}

export function TareasExternasProvider({children}) {
    const [sucursalActual, setSucursalActual] = useState(1)
    const [tareasExternas, setTareasExternas] = useState(tareasIniciales)
    const sucursales = [
        {id: '1', nombre: 'Balbuena'},
        {id: '2', nombre: 'Eje 1 Norte'},
        {id: '3', nombre: 'Moctezuma'},
        {id: '4', nombre: 'Oceanía'}
    ]

    const tiposTrabajo = [
        { id: '1', nombre: 'Lavandería'},
        { id: '2', nombre: 'Tintorería'},
        { id: '3', nombre: 'Planchado'},
        { id: '4', nombre: 'Compostura'},
    ]

    const tiposServicio = [
        { id: '1', nombre: 'Normal' },
        { id: '2', nombre: 'Exprés' },
    ]

    function agregaTareaExterna(tareaExterna) {
        setTareasExternas([...tareasExternas, tareaExterna])
    }

    function recolectaParaAtenderse(id) {
       setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id === id ? {...tareaExterna, status: STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE} : tareaExterna))
    }

    function recibeParaAtenderse(id) {
        setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id === id ? {...tareaExterna, status: STATUS_TAREA.RECIBIDO_PARA_ATENDERSE} : tareaExterna))
    }

    function terminadoParaRecolectar(id) {
        setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id === id ? {...tareaExterna, status: STATUS_TAREA.TERMINADO_PARA_RECOLECTAR} : tareaExterna))
    }

    function recolectaParaEntrega(id) {
        setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id === id ? {...tareaExterna, status: STATUS_TAREA.RECOLECTADO_PARA_ENTREGA} : tareaExterna))
    }

    function entregaASucursalOrigen(id) {
        setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id === id ? {...tareaExterna, status: STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN} : tareaExterna))
    }

    function asignaSucursalActual(id) {
        setSucursalActual(id)
    }

    function getSucursal(id) {
        const { nombre: sucursal } = sucursales.filter(sucursal => sucursal.id === id)[0]
        return sucursal
    }

    function getTipoTrabajo(id) {
        const { nombre: tipoTrabajo } = tiposTrabajo.filter(tipoTrabajo => tipoTrabajo.id === id)[0]
        return tipoTrabajo
    }

    function getTipoServicio(id) {
        const { nombre: tipoServicio } = tiposServicio.filter(tipoServicio => tipoServicio.id === id)[0]
        return tipoServicio
    }

    return (
        <TareasExternasContext.Provider value={{tareasExternas, sucursales, tiposTrabajo, tiposServicio, sucursalActual}}>
            <TareasExternasUpdateContext.Provider value={{
                agregaTareaExterna, recolectaParaAtenderse, 
                recibeParaAtenderse, terminadoParaRecolectar, 
                recolectaParaEntrega, entregaASucursalOrigen,
                asignaSucursalActual, 
                getSucursal, getTipoTrabajo, getTipoServicio
            }}>
                {children}
            </TareasExternasUpdateContext.Provider>
        </TareasExternasContext.Provider>
    )
}

