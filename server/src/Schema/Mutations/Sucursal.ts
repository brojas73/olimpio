import { SucursalType } from "../TypeDefs/Sucursal"
import { GraphQLString, GraphQLInt } from "graphql"

export const CREATE_SUCURSAL = {
    type: SucursalType,
    args: {
        nombre: { type: GraphQLString },
        estado: { type: GraphQLInt }        
    },
    resolve(parent: any, args: any) {
        const { nombre, estado } = args
        return args
    }
}