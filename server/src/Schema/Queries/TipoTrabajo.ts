import { GraphQLList } from 'graphql'
import { TipoTrabajoType } from '../TypeDefs/TipoTrabajo'
import { TipoTrabajo } from '../../Entities/TipoTrabajo'

export const GET_ALL_TIPOS_TRABAJO = {
    type: new GraphQLList(TipoTrabajoType),
    // resolve(): Promise<ISucursal[]> {
    resolve() {
        return TipoTrabajo.find()
    }
}

