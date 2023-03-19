import { GraphQLObjectType, GraphQLSchema } from "graphql";

import { GET_ALL_ESTADOS_TAREA, GET_ESTADO_TAREA_BY_ID } from "./Queries/EstadoTarea";
import { GET_ALL_ROLES, GET_ROL_BY_ID } from "./Queries/Rol";
import { GET_ALL_SUCURSALES, GET_SUCURSAL_BY_ID } from './Queries/Sucursal'
import { GET_ALL_TIPOS_ACCION } from "./Queries/TipoAccion";
import { GET_ALL_TIPOS_SERVICIO } from "./Queries/TipoServicio";
import { GET_ALL_TIPOS_TRABAJO } from "./Queries/TipoTrabajo";
import { GET_ALL_USUARIOS, GET_USUARIO_BY_ID, GET_USUARIO_BY_USUARIO, GET_USUARIO_BY_USUARIO_AND_CONTRASENA } from "./Queries/Usuario";
import { GET_ALL_TAREAS_EXTERNAS, GET_TAREAS_EXTERNAS_BY_DESCRIPCION, GET_TAREA_EXTERNA_BY_ID, GET_TAREAS_EXTERNAS_BY_TICKET, GET_TAREAS_EXTERNAS_BY_TICKET_AND_DESCRIPCION } from "./Queries/TareaExterna";
import { GET_ALL_TAREAS_EXTERNAS_LOG } from "./Queries/TareaExternaLog";

import { CREATE_ESTADO_TAREA } from "./Mutations/EstadoTarea";
import { CREATE_ROL } from "./Mutations/Rol";
import { CREATE_SUCURSAL } from "./Mutations/Sucursal";
import { CREATE_TIPO_ACCION } from "./Mutations/TipoAccion";
import { CREATE_TIPO_SERVICIO } from "./Mutations/TipoServicio";
import { CREATE_TIPO_TRABAJO } from "./Mutations/TipoTrabajo";
import { CREATE_USUARIO } from "./Mutations/Usuario";
import { CREATE_TAREA_EXTERNA } from "./Mutations/TareaExterna";

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getAllSucursales: GET_ALL_SUCURSALES,
        getAllRoles: GET_ALL_ROLES,
        getAllEstadosTarea: GET_ALL_ESTADOS_TAREA,
        getAllTiposAccion: GET_ALL_TIPOS_ACCION,
        getAllTiposServicio: GET_ALL_TIPOS_SERVICIO,
        getAllTiposTrabajo: GET_ALL_TIPOS_TRABAJO,
        getAllUsuarios: GET_ALL_USUARIOS,
        getAllTareasExternas: GET_ALL_TAREAS_EXTERNAS,
        getAllTareasExternasLog: GET_ALL_TAREAS_EXTERNAS_LOG,

        getSucursalById: GET_SUCURSAL_BY_ID,
        getRolById: GET_ROL_BY_ID,
        getEstadoTareaById: GET_ESTADO_TAREA_BY_ID,
        getUsuarioById: GET_USUARIO_BY_ID,
        getTareaExternaById: GET_TAREA_EXTERNA_BY_ID,

        getUsuarioByUsuario: GET_USUARIO_BY_USUARIO,
        getUsuarioByUsuarioAndContrasena: GET_USUARIO_BY_USUARIO_AND_CONTRASENA,

        getTareasExternasByTicket: GET_TAREAS_EXTERNAS_BY_TICKET,
        getTareasExternasByDescripcion: GET_TAREAS_EXTERNAS_BY_DESCRIPCION,
        getTareasExternasByTicketAndDescripcion: GET_TAREAS_EXTERNAS_BY_TICKET_AND_DESCRIPCION,
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createSucursal: CREATE_SUCURSAL,
        createRol: CREATE_ROL,
        creteEstadoTarea: CREATE_ESTADO_TAREA,
        createTipoAccion: CREATE_TIPO_ACCION,
        createTipoServicio: CREATE_TIPO_SERVICIO,
        createTipoTrabajo: CREATE_TIPO_TRABAJO,
        createUsuario: CREATE_USUARIO,
        creaTareaExterna: CREATE_TAREA_EXTERNA,
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
