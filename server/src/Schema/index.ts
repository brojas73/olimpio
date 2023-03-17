import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_SUCURSALES } from './Queries/Sucursal'
import { CREATE_SUCURSAL } from "./Mutations/Sucursal";

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getAllSucursales: GET_ALL_SUCURSALES
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createSucursal: CREATE_SUCURSAL,
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
