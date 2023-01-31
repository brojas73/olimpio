import React, { useContext, useEffect, useState } from "react";

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

export function useTareasExternas() {
    return useContext(TareasExternasContext)
}

export function useTareasExternasUpdate() {
    return useContext(TareasExternasUpdateContext)
}

export function TareasExternasProvider({children}) {
    const [sucursalActual, setSucursalActual] = useState('1')
    const [estadoActual, setEstadoActual] = useState(STATUS_TAREA.PENDIENTE_RECOLECCION)
    const [tareasExternas, setTareasExternas] = useState([])
    const [sucursales, setSucursales] = useState([])
    const [tiposServicio, setTiposServicio] = useState([])
    const [tiposTrabajo, setTiposTrabajo] = useState([])
    const [estados, setEstados] = useState([])

    useEffect(() => {
        async function fetchSucursales() {
            const { sucursales } = await fetchData('http://localhost:8080/sucursales')
            setSucursales(sucursales)
        }

        async function fetchTiposTrabajo() {
            const { tiposTrabajo } = await fetchData('http://localhost:8080/tipos-trabajo')
            setTiposTrabajo(tiposTrabajo)
        }

        async function fetchTiposServicio() {
            const { tiposServicio } = await fetchData('http://localhost:8080/tipos-servicio')
            setTiposServicio(tiposServicio)
        }

        async function fetchTareasExternas() {
            const { tareasExternas } = await fetchData('http://localhost:8080/tareas-externas')
            setTareasExternas(tareasExternas)
        }

        async function fetchEstados() {
            const { estados } = await fetchData('http://localhost:8080/estados')
            setEstados(estados)
        }

        fetchSucursales()
        fetchTiposTrabajo()
        fetchTiposServicio()
        fetchTareasExternas()
        fetchEstados()
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

    function asignaEstadoActual(id) {
        setEstadoActual(id)
    }

    function getSucursal(id) {
        const sucursal = sucursales.find(sucursal => sucursal.id === id)
        return sucursal?.nombre
    }

    function getTipoTrabajo(id) {
        const tipoTrabajo  = tiposTrabajo.find(tipoTrabajo => tipoTrabajo.id === id) 
        return tipoTrabajo?.nombre
    }

    function getTipoServicio(id) {
        const tipoServicio = tiposServicio.find(tipoServicio => tipoServicio.id === id)
        return tipoServicio?.nombre
    }

    function getEstado(id) {
        const estado = estados.find(estado => estado.id === id)
        return estado?.nombre
    }

    return (
        <TareasExternasContext.Provider value={{
            tareasExternas, sucursales, tiposTrabajo, tiposServicio, estados, sucursalActual, estadoActual,
            getSucursal, getTipoTrabajo, getTipoServicio, getEstado
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

