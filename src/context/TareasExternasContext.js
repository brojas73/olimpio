/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";

const URL_APIS='http://localhost:8080'
const TareasExternasContext = React.createContext()
const TareasExternasUpdateContext = React.createContext()

export const STATUS_TAREA = {
    PENDIENTE_RECOLECCION: 1,
    RECOLECTADO_PARA_ATENDERSE: 2,
    RECIBIDO_PARA_ATENDERSE: 3,
    TERMINADO_PARA_RECOLECTAR: 4,
    RECOLECTADO_PARA_ENTREGA: 5,
    ENTREGADO_A_SUCURSAL_ORIGEN: 6,
    ENTREGADO_A_CLIENTE: 7
} 

export function useTareasExternas() {
    return useContext(TareasExternasContext)
}

export function useTareasExternasUpdate() {
    return useContext(TareasExternasUpdateContext)
}

export function TareasExternasProvider({children}) {
    const [sucursalActual, setSucursalActual] = useState(1)
    const [estadoActual, setEstadoActual] = useState(STATUS_TAREA.PENDIENTE_RECOLECCION)
    const [tareasExternas, setTareasExternas] = useState([])
    const [sucursales, setSucursales] = useState([])
    const [tiposServicio, setTiposServicio] = useState([])
    const [tiposTrabajo, setTiposTrabajo] = useState([])
    const [estadosTarea, setEstadosTarea] = useState([])

    useEffect(() => {
        async function fetchSucursales() {
            const sucursales = await fetchData(`${URL_APIS}/sucursales`)
            setSucursales([...sucursales])
        }

        async function fetchTiposTrabajo() {
            const tiposTrabajo  = await fetchData(`${URL_APIS}/tipos-trabajo`)
            setTiposTrabajo([...tiposTrabajo])
        }

        async function fetchTiposServicio() {
            const tiposServicio = await fetchData(`${URL_APIS}/tipos-servicio`)
            setTiposServicio([...tiposServicio])
        }

        async function fetchEstadosTarea() {
            const estadosTarea = await fetchData(`${URL_APIS}/estado-tarea`)
            setEstadosTarea([...estadosTarea])
        }

        fetchSucursales()
        fetchTiposTrabajo()
        fetchTiposServicio()
        fetchEstadosTarea()
        fetchTareasExternas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },  [])

    useEffect(() => {
        fetchTareasExternas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sucursalActual, estadoActual])

    async function fetchTareasExternas() {
        const tareasExternas = await fetchData(`${URL_APIS}/tareas-externas-activas`)
        setTareasExternas([...tareasExternas])
    }
    
    async function fetchData(url) {
        return await fetch(url).then(data => data.json())
        // const response = await fetch(url)
        // const data = await response.json()
        // return data
    }    

    async function agregaTareaExterna(tareaExterna) {
        try {
            await fetch(`${URL_APIS}/tareas-externas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tareaExterna)
            })
        } catch (err) {
            console.log(err)
        }

        setTareasExternas([...tareasExternas, tareaExterna])
    }

    async function actualizaTareaExterna(id_tarea_externa, id_estado_tarea) {
        try {
            await fetch(`${URL_APIS}/tareas-externas/${id_tarea_externa}/${id_estado_tarea}`, {
                method: 'PUT',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_tarea_externa, id_estado_tarea })
            })

        } catch (err) {
            console.log(err)
        }
    }

    async function borraTareaExterna(id_tarea_externa) {
        try {
            await fetch(`${URL_APIS}/tareas-externas/${id_tarea_externa}`, {
                method: 'DELETE',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_tarea_externa })
            })

        } catch (err) {
            console.log(err)
        }
    }

    async function recolectaParaAtenderse(id_tarea_externa) {
        try {
            await actualizaTareaExterna(id_tarea_externa, STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE)
            setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id_tarea_externa === id_tarea_externa ? {...tareaExterna, id_estado_tarea: STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE} : tareaExterna))
        } catch (err) {
            console.log(err)
        }
    }

    async function recibeParaAtenderse(id_tarea_externa) {
        await actualizaTareaExterna(id_tarea_externa, STATUS_TAREA.RECIBIDO_PARA_ATENDERSE)
        setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id_tarea_externa === id_tarea_externa ? {...tareaExterna, id_estado_tarea: STATUS_TAREA.RECIBIDO_PARA_ATENDERSE} : tareaExterna))
    }

    async function terminadoParaRecolectar(id_tarea_externa) {
        await actualizaTareaExterna(id_tarea_externa, STATUS_TAREA.TERMINADO_PARA_RECOLECTAR)
        setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id_tarea_externa === id_tarea_externa ? {...tareaExterna, id_estado_tarea: STATUS_TAREA.TERMINADO_PARA_RECOLECTAR} : tareaExterna))
    }

    async function recolectaParaEntrega(id_tarea_externa) {
        await actualizaTareaExterna(id_tarea_externa, STATUS_TAREA.RECOLECTADO_PARA_ENTREGA)
        setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id_tarea_externa === id_tarea_externa ? {...tareaExterna, id_estado_tarea: STATUS_TAREA.RECOLECTADO_PARA_ENTREGA} : tareaExterna))
    }

    async function entregaASucursalOrigen(id_tarea_externa) {
        await actualizaTareaExterna(id_tarea_externa, STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN)
        setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id_tarea_externa === id_tarea_externa ? {...tareaExterna, id_estado_tarea: STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN} : tareaExterna))
    }

    async function entregaACliente(id_tarea_externa) {
        await actualizaTareaExterna(id_tarea_externa, STATUS_TAREA.ENTREGADO_A_CLIENTE)
        setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id_tarea_externa === id_tarea_externa ? {...tareaExterna, id_estado_tarea: STATUS_TAREA.ENTREGADO_A_CLIENTE} : tareaExterna))
    }

    function asignaSucursalActual(id_sucursal) {
        setSucursalActual(id_sucursal)
    }

    function asignaEstadoActual(id_estado_tarea) {
        setEstadoActual(id_estado_tarea)
    }

    function getSucursal(id_sucursal) {
        const sucursal = sucursales.find(sucursal => sucursal.id_sucursal == id_sucursal)
        return sucursal?.nombre
    }

    function getTipoTrabajo(id_tipo_trabajo) {
        const tipoTrabajo  = tiposTrabajo.find(tipoTrabajo => tipoTrabajo.id_tipo_trabajo == id_tipo_trabajo) 
        return tipoTrabajo?.nombre
    }

    function getTipoServicio(id_tipo_servicio) {
        const tipoServicio = tiposServicio.find(tipoServicio => tipoServicio.id_tipo_servicio == id_tipo_servicio)
        return tipoServicio?.nombre
    }

    function getEstadoTarea(id_estado_tarea) {
        const estado_tarea = estadosTarea.find(estado_tarea => estado_tarea.id_estado_tarea == id_estado_tarea)
        return estado_tarea?.nombre
    }

    return (
        <TareasExternasContext.Provider value={{
            tareasExternas, sucursales, tiposTrabajo, tiposServicio, estadosTarea, sucursalActual, estadoActual,
            getSucursal, getTipoTrabajo, getTipoServicio, getEstadoTarea
        }}>
            <TareasExternasUpdateContext.Provider value={{
                agregaTareaExterna, borraTareaExterna, recolectaParaAtenderse, 
                recibeParaAtenderse, terminadoParaRecolectar, 
                recolectaParaEntrega, entregaASucursalOrigen, entregaACliente,
                asignaSucursalActual, asignaEstadoActual
            }}>
                {children}
            </TareasExternasUpdateContext.Provider>
        </TareasExternasContext.Provider>
    )
}

