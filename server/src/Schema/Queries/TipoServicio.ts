import { GraphQLList } from 'graphql'
import { TipoServicioType } from '../TypeDefs/TipoServicio'
import { TipoServicio } from '../../Entities/TipoServicio'

export const GET_ALL_TIPOS_SERVICIO = {
    type: new GraphQLList(TipoServicioType),
    // resolve(): Promise<ISucursal[]> {
    resolve() {
        return TipoServicio.find()
    }
}

