import { GraphQLList } from 'graphql'
import { TareaExternaLogType } from '../TypeDefs/TareaExternaLog'
import { TareaExternaLog } from '../../Entities/TareaExternaLog'

export const GET_ALL_TAREAS_EXTERNAS_LOG = {
    type: new GraphQLList(TareaExternaLogType),
    // resolve(): Promise<IEstadoTarea[]> {
    resolve() {
        return TareaExternaLog.find()
    }
}

