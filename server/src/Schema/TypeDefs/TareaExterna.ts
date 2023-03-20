import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'
import { EstadoTarea } from '../../Entities/EstadoTarea'
import { Sucursal } from '../../Entities/Sucursal'
import { TipoServicio } from '../../Entities/TipoServicio'
import { TipoTrabajo } from '../../Entities/TipoTrabajo'
import { Usuario } from '../../Entities/Usuario'
import { EstadoTareaType } from './EstadoTarea'
import { SucursalType } from './Sucursal'
import { TipoServicioType } from './TipoServicio'
import { TipoTrabajoType } from './TipoTrabajo'
import { UsuarioType } from './Usuario'

export const TareaExternaType = new GraphQLObjectType({
    name: 'TareaExterna',
    fields: () => ({
        id_tarea_externa: { type:  GraphQLID },
        descripcion: { type: GraphQLString },
        fecha_requerida: { type:  GraphQLString },
        hora_requerida: { type:  GraphQLString },
        fecha_creacion: { type:  GraphQLString },
        fecha_modificacion: { type:  GraphQLString },
        estado: { type: GraphQLInt },
        sucursal_origen: {
            type: SucursalType,
            resolve(parent, _) {
                return Sucursal.findOne({where: {id_sucursal: parent.id_sucursal_origen}})
            }
        },
        sucursal_destino: {
            type: SucursalType,
            resolve(parent, _) {
                return Sucursal.findOne({where: {id_sucursal: parent.id_sucursal_destino}})
            }
        },
        tipo_trabajo: {
            type: TipoTrabajoType,
            resolve(parent, _) {
                return TipoTrabajo.findOne({where: {id_tipo_trabajo: parent.id_tipo_trabajo}})
            }
        },
        tipo_servicio: {
            type: TipoServicioType,
            resolve(parent, _) {
                return TipoServicio.findOne({where: {id_tipo_servicio: parent.id_tipo_servicio}})
            }
        },
        estado_tarea: {
            type: EstadoTareaType,
            resolve(parent, _) {
                return EstadoTarea.findOne({where: {id_estado_tarea: parent.id_estado_tarea}})
            }
        },
        creado_por: {
            type: UsuarioType,
            resolve(parent, _) {
                return Usuario.findOne({where: { id_usuario: parent.id_creado_por }})
            }
        },
        modificado_por: {
            type: UsuarioType,
            resolve(parent, _) {
                return Usuario.findOne({where: { id_usuario: parent.id_modificado_por }})
            }
        },
    })
})
