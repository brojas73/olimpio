import { UsuarioType } from "../TypeDefs/Usuario"
import { GraphQLString, GraphQLInt } from "graphql"
import { Usuario } from "../../Entities/Usuario"
import { IUsuario } from "../../Interfaces/Usuario"

export const CREATE_USUARIO = {
    type: UsuarioType,
    args: {
        usuario: { type: GraphQLString },
        nombre: { type: GraphQLString },
        contrasena: { type: GraphQLString },
        email: { type: GraphQLString },
        id_rol: { type: GraphQLInt },
        estado: { type: GraphQLInt }
    },
    async resolve(_: any, args: IUsuario): Promise<IUsuario | null> {
        const { usuario, nombre, contrasena, email, id_rol, estado } = args
        await Usuario.insert({usuario, nombre, contrasena, email, id_rol, estado})
        return args
    }
}
