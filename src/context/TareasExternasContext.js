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
    ENTREGADO_A_SUCURSAL_ORIGEN: 6
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
            setSucursales(sucursales)
        }

        async function fetchTiposTrabajo() {
            const tiposTrabajo  = await fetchData(`${URL_APIS}/tipos-trabajo`)
            setTiposTrabajo(tiposTrabajo)
        }

        async function fetchTiposServicio() {
            const tiposServicio = await fetchData(`${URL_APIS}/tipos-servicio`)
            setTiposServicio(tiposServicio)
        }

        async function fetchTareasExternas() {
            const tareasExternas = await fetchData(`${URL_APIS}/tareas-externas`)
            setTareasExternas(tareasExternas)
        }

        async function fetchEstadosTarea() {
            const estadosTarea = await fetchData(`${URL_APIS}/estado-tarea`)
            setEstadosTarea(estadosTarea)
        }

        fetchSucursales()
        fetchTiposTrabajo()
        fetchTiposServicio()
        fetchTareasExternas()
        fetchEstadosTarea()
    },  [])

    async function fetchData(url) {
        return await fetch(url).then(data => data.json())
        // const response = await fetch(url)
        // const data = await response.json()
        // return data
    }    

    function agregaTareaExterna(tareaExterna) {
        setTareasExternas([...tareasExternas, tareaExterna])
    }

    function recolectaParaAtenderse(id_tarea_externa) {
       setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id_tarea_externa === id_tarea_externa ? {...tareaExterna, id_estado_tarea: STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE} : tareaExterna))
    }

    function recibeParaAtenderse(id_tarea_externa) {
        setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id_tarea_externa === id_tarea_externa ? {...tareaExterna, id_estado_tarea: STATUS_TAREA.RECIBIDO_PARA_ATENDERSE} : tareaExterna))
    }

    function terminadoParaRecolectar(id_tarea_externa) {
        setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id_tarea_externa === id_tarea_externa ? {...tareaExterna, id_estado_tarea: STATUS_TAREA.TERMINADO_PARA_RECOLECTAR} : tareaExterna))
    }

    function recolectaParaEntrega(id_tarea_externa) {
        setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id_tarea_externa === id_tarea_externa ? {...tareaExterna, id_estado_tarea: STATUS_TAREA.RECOLECTADO_PARA_ENTREGA} : tareaExterna))
    }

    function entregaASucursalOrigen(id) {
        setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id_tarea_externa === id ? {...tareaExterna, id_estado_tarea: STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN} : tareaExterna))
    }

    function asignaSucursalActual(id_sucursal) {
        setSucursalActual(id_sucursal)
    }

    function asignaEstadoActual(id_estado_tarea) {
        setEstadoActual(id_estado_tarea)
    }

    function getSucursal(id_sucursal) {
        const sucursal = sucursales.find(sucursal => sucursal.id_sucursal === id_sucursal)
        return sucursal?.nombre
    }

    function getTipoTrabajo(id_tipo_trabajo) {
        const tipoTrabajo  = tiposTrabajo.find(tipoTrabajo => tipoTrabajo.id_tipo_trabajo === id_tipo_trabajo) 
        return tipoTrabajo?.nombre
    }

    function getTipoServicio(id_tipo_servicio) {
        const tipoServicio = tiposServicio.find(tipoServicio => tipoServicio.id_tipo_servicio === id_tipo_servicio)
        return tipoServicio?.nombre
    }

    function getEstadoTarea(id_estado_tarea) {
        const estado_tarea = estadosTarea.find(estado_tarea => estado_tarea.id_estado_tarea === id_estado_tarea)
        return estado_tarea?.nombre
    }

    return (
        <TareasExternasContext.Provider value={{
            tareasExternas, sucursales, tiposTrabajo, tiposServicio, estadosTarea, sucursalActual, estadoActual,
            getSucursal, getTipoTrabajo, getTipoServicio, getEstadoTarea
        }}>
            <TareasExternasUpdateContext.Provider value={{
                agregaTareaExterna, recolectaParaAtenderse, 
                recibeParaAtenderse, terminadoParaRecolectar, 
                recolectaParaEntrega, entregaASucursalOrigen,
                asignaSucursalActual, asignaEstadoActual
            }}>
                {children}
            </TareasExternasUpdateContext.Provider>
        </TareasExternasContext.Provider>
    )
}

