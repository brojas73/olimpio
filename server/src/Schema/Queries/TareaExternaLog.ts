import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql'
import { TareaExternaLogType } from '../TypeDefs/TareaExternaLog'
import { TareaExternaLog } from '../../Entities/TareaExternaLog'
import { ITareaExternaLog } from '../../Interfaces/TareaExternaLog'

export const GET_ALL_TAREAS_EXTERNAS_LOG = {
    type: new GraphQLList(TareaExternaLogType),
    async resolve(): Promise<ITareaExternaLog[]> {
        return await TareaExternaLog.find()
    }
}

export const GET_TAREA_EXTERNA_LOG_BY_ID = {
    type: TareaExternaLogType,
    args: {
        id_tarea_externa_log: { type: GraphQLInt }
    },
    async resolve(_: any, args: ITareaExternaLog): Promise<ITareaExternaLog | null> {
        return await TareaExternaLog.findOne({where: {id_tarea_externa_log: args.id_tarea_externa_log}})
    }
}

export const GET_TAREAS_EXTERNAS_LOG_BY_TICKET_AND_DESCRIPCION = {
    type: new GraphQLList(TareaExternaLogType),
    args: {
        ticket: { type: GraphQLString },
        descripcion: { type: GraphQLString },
    },
    async resolve(_: any, args: ITareaExternaLog): Promise<ITareaExternaLog[]> {
        return await TareaExternaLog.find({ where: { 
            // ticket: Like(`${args.ticket}`),
            // descripcion: Like(`${args.descripcion}`)
        }})    
    }
}
