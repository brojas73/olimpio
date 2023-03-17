import { GraphQLList } from 'graphql'
import { SucursalType } from '../TypeDefs/Sucursal'
import { Sucursal } from '../../Entities/Sucursal'

export const GET_ALL_SUCURSALES = {
    type: new GraphQLList(SucursalType),
    // resolve(): Promise<ISucursal[]> {
    resolve() {
        return Sucursal.find()
    }
}

