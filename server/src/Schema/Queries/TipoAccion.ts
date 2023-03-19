import { GraphQLList } from 'graphql'
import { TipoAccionType } from '../TypeDefs/TipoAccion'
import { TipoAccion } from '../../Entities/TipoAccion'

export const GET_ALL_TIPOS_ACCION = {
    type: new GraphQLList(TipoAccionType),
    // resolve(): Promise<ISucursal[]> {
    resolve() {
        return TipoAccion.find()
    }
}

