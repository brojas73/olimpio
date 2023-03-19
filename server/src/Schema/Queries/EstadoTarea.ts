import { GraphQLID, GraphQLList } from 'graphql'
import { EstadoTareaType } from '../TypeDefs/EstadoTarea'
import { EstadoTarea } from '../../Entities/EstadoTarea'
import { IEstadoTarea } from '../../Interfaces/EstadoTarea'

export const GET_ALL_ESTADOS_TAREA = {
    type: new GraphQLList(EstadoTareaType),
    // resolve(): Promise<IEstadoTarea[]> {
    resolve() {
        return EstadoTarea.find()
    }
}

export const GET_ESTADO_TAREA_BY_ID = {
    type: EstadoTareaType,
    args: {
        id_estado_tarea: { type: GraphQLID },
    },
    async resolve(_: any, args: IEstadoTarea) {
        return await EstadoTarea.findOne({ where: { id_estado_tarea: args.id_estado_tarea }})    
    }
}
