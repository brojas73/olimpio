import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql'
import { EstadoTarea } from '../../Entities/EstadoTarea'
import { TareaExterna } from '../../Entities/TareaExterna'
import { TipoAccion } from '../../Entities/TipoAccion'
import { Usuario } from '../../Entities/Usuario'
import { EstadoTareaType } from './EstadoTarea'
import { TareaExternaType } from './TareaExterna'
import { TipoAccionType } from './TipoAccion'
import { UsuarioType } from './Usuario'

export const TareaExternaLogType = new GraphQLObjectType({
    name: 'TareaExternaLog',
    fields: () => ({
        id_tarea_externa_log: { type:  GraphQLID },
        fecha: { type:  GraphQLString },

        tarea_externa: {
            type: TareaExternaType,
            resolve(parent, _) {
                return TareaExterna.findOne({where: {id_tarea_externa: parent.id_tarea_externa}})
            }
        },

        tipo_accion: {
            type: TipoAccionType,
            resolve(parent, _) {
                return TipoAccion.findOne({where: {id_tipo_accion: parent.id_tipo_accion}})
            }
        },

        usuario: {
            type: UsuarioType,
            resolve(parent, _) {
                return Usuario.findOne({where: {id_usuario: parent.id_usuario}})
            }
        },

        estado_tarea_ini: {
            type: EstadoTareaType,
            resolve(parent, _) {
                return EstadoTarea.findOne({where: {id_estado_tarea: parent.id_estado_tarea_ini}})
            }
        },

        estado_tarea_fin: {
            type: EstadoTareaType,
            resolve(parent, _) {
                return EstadoTarea.findOne({where: {id_estado_tarea: parent.id_estado_tarea_fin}})
            }
        },
    })
})
