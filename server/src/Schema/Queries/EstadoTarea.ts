import { GraphQLList } from 'graphql'
import { EstadoTareaType } from '../TypeDefs/EstadoTarea'
import { EstadoTarea } from '../../Entities/EstadoTarea'

export const GET_ALL_EstadoTareaES = {
    type: new GraphQLList(EstadoTareaType),
    // resolve(): Promise<IEstadoTarea[]> {
    resolve() {
        return EstadoTarea.find()
    }
}

