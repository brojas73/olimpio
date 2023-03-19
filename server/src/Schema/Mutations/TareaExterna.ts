import { GraphQLString, GraphQLInt } from "graphql"
import { TareaExternaType } from "../TypeDefs/TareaExterna"
import { TareaExterna } from "../../Entities/TareaExterna"

export const CREATE_TAREA_EXTERNA = {
    type: TareaExternaType,
    args: {
        id_sucursal_origen: { type:  GraphQLInt },
        ticket: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        id_tipo_trabajo: { type:  GraphQLInt },
        id_sucursal_destino: { type:  GraphQLInt },
        fecha_requerida: { type:  GraphQLString },
        hora_requerida: { type:  GraphQLString },
        id_tipo_servicio: { type:  GraphQLInt },
        id_estado_tarea: { type:  GraphQLInt },
        fecha_creacion: { type:  GraphQLString },
        id_creado_por: { type:  GraphQLInt },
        fecha_modificacion: { type:  GraphQLString },
        id_modificado_por: { type:  GraphQLInt },
        estado: { type: GraphQLInt }
    },
    async resolve(parent: any, args: any) {
        const { 
            id_sucursal_origen, ticket, descripcion, id_tipo_trabajo, id_sucursal_destino,
            fecha_requerida, hora_requerida, id_tipo_servicio, id_estado_tarea, fecha_creacion, id_creado_por,
            fecha_modificacion, id_modificado_por, estado
        } = args
        await TareaExterna.insert({
            id_sucursal_origen, ticket, descripcion, id_tipo_trabajo, id_sucursal_destino,
            fecha_requerida, hora_requerida, id_tipo_servicio, id_estado_tarea, fecha_creacion, id_creado_por,
            fecha_modificacion, id_modificado_por, estado
        })
        return args
    }
}
