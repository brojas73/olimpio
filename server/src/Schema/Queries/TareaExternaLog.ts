import { GraphQLList, GraphQLString } from 'graphql'
import { TareaExternaLogType } from '../TypeDefs/TareaExternaLog'
import { TareaExternaLog } from '../../Entities/TareaExternaLog'
import { ITareaExternaLog } from '../../Interfaces/TareaExternaLog'

export const GET_ALL_TAREAS_EXTERNAS_LOG = {
    type: new GraphQLList(TareaExternaLogType),
    // resolve(): Promise<IEstadoTarea[]> {
    resolve() {
        return TareaExternaLog.find()
    }
}

export const GET_TAREAS_EXTERNAS_LOG_BY_TICKET_AND_DESCRIPCION = {
    type: new GraphQLList(TareaExternaLogType),
    args: {
        ticket: { type: GraphQLString },
        descripcion: { type: GraphQLString },
    },
    async resolve(_: any, args: ITareaExternaLog) {

        return await TareaExternaLog.find({ where: { 
            // ticket: Like(`${args.ticket}`),
            // descripcion: Like(`${args.descripcion}`)
        }})    
    }
}
