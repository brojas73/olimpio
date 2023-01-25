import React, { useContext, useState } from "react";

const TareasExternasContext = React.createContext()
const TareasExternasUpdateContext = React.createContext()

export const STATUS_TAREA = {
    PENDIENTE_RECOLECCION: 'pendite-de-recoleccion',
    RECOLECTADO_PARA_ATENDERSE: 'recolectado-para-atenderse',
    RECIBIDO_PARA_ATENDERSE: 'recibido-para_atenderse',
    TERMINADO_PARA_RECOLECTAR: 'terminado-para-recolectar',
    RECOLECTADO_PARA_ENTREGA: 'recolectado-para-entrega',
    ENTREGADO_A_SUCURSAL_ORIGEN: 'entregado-a-sucursal-origen'
} 

const tareasIniciales = [
    {id: 1, ticket: '11111', descripcion: 'descripcion 1', tipoTrabajo: '1', sucursalDestino: 1, fechaRequerida: '12345', tipoServicio: 'normal', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 2, ticket: '22222', descripcion: 'descripcion 2', tipoTrabajo: '2', sucursalDestino: 2, fechaRequerida: '12345', tipoServicio: 'normal', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 3, ticket: '33333', descripcion: 'descripcion 3', tipoTrabajo: '3', sucursalDestino: 3, fechaRequerida: '12345', tipoServicio: 'normal', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 4, ticket: '44444', descripcion: 'descripcion 4', tipoTrabajo: '4', sucursalDestino: 4, fechaRequerida: '12345', tipoServicio: 'normal', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 5, ticket: '55555', descripcion: 'descripcion 5', tipoTrabajo: '1', sucursalDestino: 1, fechaRequerida: '12345', tipoServicio: 'normal', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 6, ticket: '66666', descripcion: 'descripcion 6', tipoTrabajo: '2', sucursalDestino: 2, fechaRequerida: '12345', tipoServicio: 'normal', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 7, ticket: '77777', descripcion: 'descripcion 7', tipoTrabajo: '3', sucursalDestino: 3, fechaRequerida: '12345', tipoServicio: 'normal', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 8, ticket: '88888', descripcion: 'descripcion 8', tipoTrabajo: '4', sucursalDestino: 4, fechaRequerida: '12345', tipoServicio: 'normal', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
    {id: 9, ticket: '99999', descripcion: 'descripcion 9', tipoTrabajo: '1', sucursalDestino: 1, fechaRequerida: '12345', tipoServicio: 'normal', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
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
        {id: 1, nombre: 'Sucursal 1'},
        {id: 2, nombre: 'Sucursal 2'},
        {id: 3, nombre: 'Sucursal 3'},
        {id: 4, nombre: 'Sucursal 4'}
    ]

    const tiposTrabajo = [
        { id: 1, nombre: 'Lavandería'},
        { id: 2, nombre: 'Tintorería'},
        { id: 3, nombre: 'Planchado'},
        { id: 4, nombre: 'Compostura'},
    ]

    const tiposServicio = [
        { id: 1, nombre: 'Normal' },
        { id: 2, nombre: 'Exprés' },
    ]

    function inicializaTareasExternas(tareas) {
        setTareasExternas(tareas.map(tarea => tarea))
    }

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
        inicializaTareasExternas(tareasExternas)
    }

    return (
        <TareasExternasContext.Provider value={{tareasExternas, sucursales, tiposTrabajo, tiposServicio, sucursalActual}}>
            <TareasExternasUpdateContext.Provider value={{
                agregaTareaExterna, recolectaParaAtenderse, 
                recibeParaAtenderse, terminadoParaRecolectar, 
                recolectaParaEntrega, entregaASucursalOrigen,
                asignaSucursalActual
            }}>
                {children}
            </TareasExternasUpdateContext.Provider>
        </TareasExternasContext.Provider>
    )
}

