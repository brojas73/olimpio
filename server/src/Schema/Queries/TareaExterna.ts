import { GraphQLID, GraphQLList, GraphQLString } from 'graphql'
import { TareaExternaType} from '../TypeDefs/TareaExterna'
import { TareaExterna } from '../../Entities/TareaExterna'
import { ITareaExterna } from '../../Interfaces/TareaExterna'
import { Like } from 'typeorm'

export const GET_ALL_TAREAS_EXTERNAS = {
    type: new GraphQLList(TareaExternaType),
    // resolve(): Promise<IEstadoTarea[]> {
    resolve() {
        return TareaExterna.find()
    }
}

export const GET_TAREA_EXTERNA_BY_ID = {
    type: TareaExternaType,
    args: {
        id_tarea_externa: { type: GraphQLID },
    },
    async resolve(_: any, args: ITareaExterna) {
        return await TareaExterna.findOne({ where: { id_tarea_externa: args.id_tarea_externa }})    
    }
}

export const GET_TAREAS_EXTERNAS_BY_TICKET = {
    type: new GraphQLList(TareaExternaType),
    args: {
        ticket: { type: GraphQLString },
    },
    async resolve(_: any, args: ITareaExterna) {
        return await TareaExterna.find({ where: { ticket: Like(`${args.ticket}`) }})    
    }
}

export const GET_TAREAS_EXTERNAS_BY_DESCRIPCION = {
    type: new GraphQLList(TareaExternaType),
    args: {
        descripcion: { type: GraphQLString },
    },
    async resolve(_: any, args: ITareaExterna) {
        return await TareaExterna.find({ where: { descripcion: Like(`${args.descripcion}`)}})    
    }
}

export const GET_TAREAS_EXTERNAS_BY_TICKET_AND_DESCRIPCION = {
    type: new GraphQLList(TareaExternaType),
    args: {
        ticket: { type: GraphQLString },
        descripcion: { type: GraphQLString },
    },
    async resolve(_: any, args: ITareaExterna) {
        return await TareaExterna.find({ where: { 
            ticket: Like(`${args.ticket}`),
            descripcion: Like(`${args.descripcion}`)
        }})    
    }
}
