import { GraphQLID, GraphQLList } from 'graphql'
import { SucursalType } from '../TypeDefs/Sucursal'
import { Sucursal } from '../../Entities/Sucursal'
import { ISucursal } from '../../Interfaces/Sucursal'

export const GET_ALL_SUCURSALES = {
    type: new GraphQLList(SucursalType),
    // resolve(): Promise<ISucursal[]> {
    resolve() {
        return Sucursal.find()
    }
}

export const GET_SUCURSAL_BY_ID = {
    type: SucursalType,
    args: {
        id_sucursal: { type: GraphQLID },
    },
    async resolve(_: any, args: ISucursal) {
        return await Sucursal.findOne({ where: { id_sucursal: args.id_sucursal }})    
    }
}
