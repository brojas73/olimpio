/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchData } from "../components/comun/Funciones";

export const URL_APIS = 'http://localhost:8080/api'
// export const URL_APIS = 'http://5.183.8.10/api'
// export const URL_APIS = process.env.REACT_APP_API_URL;

export const STATUS_TAREA = {
    TAREAS_ACTIVAS: 0,
    PENDIENTE_RECOLECCION: 1,
    RECOLECTADO_PARA_ATENDERSE: 2,
    RECIBIDO_PARA_ATENDERSE: 3,
    TERMINADO_PARA_RECOLECTAR: 4,
    RECOLECTADO_PARA_ENTREGA: 5,
    ENTREGADO_A_SUCURSAL_ORIGEN: 6,
    RECIBIDO_EN_SUCURSAL_ORIGEN: 7
} 

export const TIPOS_SERVICIO = {
    NORMAL: 1,
    EXPRESS: 2
}

export const TIPO_ACCION = {
    INSERT: 1,
    DELETE: 2,
    UPDATE: 3
}

export const SUCURSAL_DEFAULT = 1

const TareasExternasContext = React.createContext()
const TareasExternasUpdateContext = React.createContext()

export function useTareasExternas() {
    return useContext(TareasExternasContext)
}

export function useTareasExternasUpdate() {
    return useContext(TareasExternasUpdateContext)
}

export function TareasExternasProvider({children}) {
    const { credenciales } = useAuth()

    const [conectado, setConectado] = useState(false)
    const [sucursalActual, setSucursalActual] = useState(SUCURSAL_DEFAULT)
    const [estadoActual, setEstadoActual] = useState(STATUS_TAREA.TAREAS_ACTIVAS)

    const [ticketFiltro, setTicketFiltro] = useState('')
    const [sucursalFiltro, setSucursalFiltro] = useState(0)
    const [tipoServicioFiltro, setTipoServicioFiltro] = useState(0)
    const [tipoTrabajoFiltro, setTipoTrabajoFiltro] = useState(0)

    const [tareasExternas, setTareasExternas] = useState([])

    const [roles, setRoles] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [sucursales, setSucursales] = useState([])
    const [tiposServicio, setTiposServicio] = useState([])
    const [tiposTrabajo, setTiposTrabajo] = useState([])
    const [estadosTarea, setEstadosTarea] = useState([])

    useEffect(() => {
        async function fetchSucursales() {
            await fetchData(`${URL_APIS}/sucursales`)
                    .then(data => setSucursales([...data]))
        }

        async function fetchTiposTrabajo() {
            await fetchData(`${URL_APIS}/tipos-trabajo`)
                    .then(data => setTiposTrabajo([...data]))
        }

        async function fetchTiposServicio() {
            await fetchData(`${URL_APIS}/tipos-servicio`)
                    .then(data => setTiposServicio([...data]))
        }

        async function fetchEstadosTarea() {
            await fetchData(`${URL_APIS}/estados-tarea`)
                    .then(data => setEstadosTarea([...data]))
        }

        async function fetchRoles() {
            await fetchData(`${URL_APIS}/roles`)
                    .then(data => setRoles([...data]))
        }

        try {
            fetchSucursales()
            
            // if (conectado) {
                fetchTiposTrabajo()
                fetchTiposServicio()
                fetchEstadosTarea()
                fetchRoles()
                fetchUsuarios()
            // }
        } catch (err) {
            console.log(err)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },  [conectado])

    useEffect(() => {
        fetchTareasExternas()
        fetchUsuarios()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conectado, sucursalActual, estadoActual])

    async function fetchUsuarios() {
        await fetchData(`${URL_APIS}/usuarios`)
                  .then(data => setUsuarios([...data]))
    }

    async function fetchTareasExternas() {
        try {
            await fetchData(`${URL_APIS}/tareas-externas-activas`)
                .then(tareasExternas => setTareasExternas([...tareasExternas]))
        } catch (err) {
            console.log('TareasExternasContext.fetchTareasExternas()', err)
        }
    }
    
    async function agregaTareaExterna(tareaExterna) {
        try {
            const response = await fetch(`${URL_APIS}/tareas-externas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tareaExterna)
            })

            if (!response.ok) {
                const mensaje = `Ocurrió un error: ${response.status}`
                throw new Error(mensaje)
            }

            const data = await response.json()
            setTareasExternas(prevTareasExternas => [...prevTareasExternas, tareaExterna])
            return data
        } catch (err) {
            console.log(err)
        }
    }

    async function borraTareaExterna(id_tarea_externa) {
        try {
            console.log('TareasExternasContext.borraTareaExterna.id_tarea_externa', id_tarea_externa)
            const response = await fetch(`${URL_APIS}/tareas-externas/${id_tarea_externa}`, {
                method: 'DELETE',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_tarea_externa })
            })

            if (!response.ok) {
                const mensaje = `Ocurrió un error: ${response.status}`
                throw new Error(mensaje)
            }
 
            const data = await response.json()
            // setTareasExternas(currentTareasExternas => {
            //     return currentTareasExternas.filter(tareaExterna => tareaExterna.id_tarea_externa !== id_tarea_externa)
            // })
            setTareasExternas(currentTareasExternas => currentTareasExternas.filter(tareaExterna => tareaExterna.id_tarea_externa !== id_tarea_externa))
            return data
        } catch (err) {
            console.log(err)
        }
    }

    async function actualizaTareaExterna(id_tarea_externa, id_estado_tarea) {
        try {
            const response = await fetch(`${URL_APIS}/tareas-externas/${id_tarea_externa}/${id_estado_tarea}/${credenciales.id_usuario}`, {
                method: 'PUT',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_tarea_externa, id_estado_tarea, id_usuario: credenciales.id_usuario })
            })

            if (!response.ok) {
                const mensaje = `Ocurrió un error: ${response.status}`
                throw new Error(mensaje)
            }

            const data = await response.json()
            let mensaje = ''
            switch (id_estado_tarea) {
                case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE:
                    mensaje = 'Tarea recolectada para atenderse con éxito'
                    break
                case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE:
                    mensaje = 'Tarea recibida con éxito'
                    break
                case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR:
                    mensaje = 'Tarea terminada con éxito'
                    break
                case STATUS_TAREA.RECOLECTADO_PARA_ENTREGA:
                    mensaje = 'Tarea recolectada para entrega con éxito'
                    break
                case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN:
                    mensaje = 'Tarea entregada en sucursal origen con éxito'
                    break
                case STATUS_TAREA.RECIBIDO_EN_SUCURSAL_ORIGEN:
                    mensaje = 'Tarea recibida en sucursal origen con éxito'
                    break
                default:
                    mensaje = 'Tarea actualizada con éxito'
                    break
            }
            data.mensaje = mensaje
            // setTareasExternas(currentTareasExternas => {
            //     currentTareasExternas.map(tareaExterna => {
            //         return (tareaExterna.id_tarea_externa === id_tarea_externa) ? {...tareaExterna, id_estado_tarea: id_estado_tarea} : tareaExterna
            //     })
            setTareasExternas(tareasExternas.map(tareaExterna => (tareaExterna.id_tarea_externa === id_tarea_externa) ? {...tareaExterna, id_estado_tarea: id_estado_tarea} : tareaExterna))
            return data
        } catch (err) {
            console.log(err)
        }
    }

    function asignaSucursalActual(id_sucursal) {
        setSucursalActual(id_sucursal)
    }

    function asignaEstadoActual(id_estado_tarea) {
        setEstadoActual(id_estado_tarea)
    }

    function asignaConectado(conectado) {
        setConectado(conectado)
    }

    function asignaTicketFiltro(ticket) {
        setTicketFiltro(ticket)
    }

    function asignaSucursalFiltro(id_sucursal) {
        setSucursalFiltro(id_sucursal)
    }

    function asignaTipoTrabajoFiltro(id_tipo_trabajo) {
        setTipoTrabajoFiltro(id_tipo_trabajo)
    }

    function asignaTipoServicioFiltro(id_tipo_servicio) {
        setTipoServicioFiltro(id_tipo_servicio)
    }

    function getSucursal(id_sucursal) {
        const sucursal = sucursales.find(sucursal => sucursal.id_sucursal == id_sucursal)
        return (sucursal ? sucursal.nombre : 'Sucursal')
    }

    function getTipoTrabajo(id_tipo_trabajo) {
        const tipoTrabajo  = tiposTrabajo.find(tipoTrabajo => tipoTrabajo.id_tipo_trabajo == id_tipo_trabajo) 
        return (tipoTrabajo ? tipoTrabajo.nombre : 'Tipo de Trabajo')
    }

    function getTipoServicio(id_tipo_servicio) {
        const tipoServicio = tiposServicio.find(tipoServicio => tipoServicio.id_tipo_servicio == id_tipo_servicio)
        return (tipoServicio ? tipoServicio.nombre : 'Tipo de Servicio')
    }

    function getEstadoTarea(id_estado_tarea) {
        const estadoTarea = estadosTarea.find(estadoTarea => estadoTarea.id_estado_tarea == id_estado_tarea)
        return (estadoTarea ? estadoTarea.nombre : 'Estado')
    }

    function getUsuario(id_usuario) {
        const usuario = usuarios.find(usuario => usuario.id_usuario === id_usuario)
        return (usuario ? usuario.nombre : 'Usuario')
    }

    return (
        <TareasExternasContext.Provider value={{
            tareasExternas, sucursales, tiposTrabajo, tiposServicio, estadosTarea, roles, 
            sucursalActual, estadoActual, conectado,
            ticketFiltro, sucursalFiltro, tipoServicioFiltro, tipoTrabajoFiltro, 
            getSucursal, getTipoTrabajo, getTipoServicio, getEstadoTarea, getUsuario
        }}>
            <TareasExternasUpdateContext.Provider value={{
                agregaTareaExterna, borraTareaExterna, actualizaTareaExterna,
                asignaSucursalActual, asignaEstadoActual, asignaConectado, 
                asignaTicketFiltro, asignaSucursalFiltro, asignaTipoTrabajoFiltro, asignaTipoServicioFiltro
            }}>
                {children}
            </TareasExternasUpdateContext.Provider>
        </TareasExternasContext.Provider>
    )
}

