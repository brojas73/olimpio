/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const URL_APIS = 'http://localhost:8080'
const TareasExternasContext = React.createContext()
const TareasExternasUpdateContext = React.createContext()

export const STATUS_TAREA = {
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

export function useTareasExternas() {
    return useContext(TareasExternasContext)
}

export function useTareasExternasUpdate() {
    return useContext(TareasExternasUpdateContext)
}

export function TareasExternasProvider({children}) {
    const [ticketFiltro, setTicketFiltro] = useState('')
    const [sucursalFiltro, setSucursalFiltro] = useState(0)
    const [tipoServicioFiltro, setTipoServicioFiltro] = useState(0)
    const [tipoTrabajoFiltro, setTipoTrabajoFiltro] = useState(0)

    const [sucursalActual, setSucursalActual] = useState(0)
    const [estadoActual, setEstadoActual] = useState(STATUS_TAREA.PENDIENTE_RECOLECCION)
    const [tareasExternas, setTareasExternas] = useState([])
    const [roles, setRoles] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [sucursales, setSucursales] = useState([])
    const [tiposServicio, setTiposServicio] = useState([])
    const [tiposTrabajo, setTiposTrabajo] = useState([])
    const [estadosTarea, setEstadosTarea] = useState([])
    const [conectado, setConectado] = useState(false)
    const { credenciales } = useAuth()

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
            const estadosTarea = await fetchData(`${URL_APIS}/estados-tarea`)
            setEstadosTarea([...estadosTarea])
        }

        async function fetchRoles() {
            const roles = await fetchData(`${URL_APIS}/roles`)
            setRoles([...roles])
        }

        async function fetchUsuarios() {
            const usuarios = await fetchData(`${URL_APIS}/usuarios`)
            setUsuarios([...usuarios])
        }

        try {
            if (conectado) {
                fetchSucursales()
                fetchTiposTrabajo()
                fetchTiposServicio()
                fetchEstadosTarea()
                fetchRoles()
                fetchUsuarios()
            }
        } catch (err) {
            console.log(err)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },  [conectado])

    useEffect(() => {
        if (conectado) {
            fetchTareasExternas()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conectado, sucursalActual, estadoActual])

    async function fetchData(url) {
        return await fetch(url).then(response => response.json())
    }    

    function fetchTareasExternas() {
        try {
            fetchData(`${URL_APIS}/tareas-externas-activas`)
                .then(tareasExternas => {
                    setTareasExternas([...tareasExternas])
                })
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
            setTareasExternas([...tareasExternas, tareaExterna])
            return data
        } catch (err) {
            console.log(err)
        }
    }

    async function borraTareaExterna(id_tarea_externa) {
        try {
            const response = await fetch(`${URL_APIS}/tareas-externas/${id_tarea_externa}/${credenciales.usuario}`, {
                method: 'DELETE',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_tarea_externa })
            })

            if (!response.ok) {
                const mensaje = `Ocurrió un error: ${response.status}`
                throw new Error(mensaje)
            }
 
            const data = await response.json()
            setTareasExternas(tareasExternas.filter(tareaExterna => tareaExterna.id_tarea_externa !== id_tarea_externa))
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
            setTareasExternas(tareasExternas.map(tareaExterna => tareaExterna.id_tarea_externa === id_tarea_externa ? {...tareaExterna, id_estado_tarea: id_estado_tarea} : tareaExterna))
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
        const estado_tarea = estadosTarea.find(estado_tarea => estado_tarea.id_estado_tarea == id_estado_tarea)
        return (estado_tarea ? estado_tarea.nombre : 'Estado')
    }

    function getUsuario(id_usuario) {
        const usuario = usuarios.find(usuario => usuario.id_usuario === id_usuario)
        return usuario?.nombre
    }

    return (
        <TareasExternasContext.Provider value={{
            tareasExternas, sucursales, tiposTrabajo, tiposServicio, estadosTarea, roles, sucursalActual, estadoActual, conectado,
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

