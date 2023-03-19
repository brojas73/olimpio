import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'
import { RelationType } from 'typeorm/metadata/types/RelationTypes'
import { Rol } from '../../Entities/Rol'
import { IRol } from '../../Interfaces/Rol'
import { RolType } from './Rol'

export const UsuarioType = new GraphQLObjectType({
    name: 'Usuario',
    fields: () => ({
        id_usuario: { type:  GraphQLID },
        usuario: { type: GraphQLString },
        nombre: { type: GraphQLString },
        contrasena: { type: GraphQLString },
        email: { type: GraphQLString },
        id_rol: { type: GraphQLInt },
        rol: { 
            type: RolType,
            resolve(parent, _) {
                return Rol.findOne({ where: {id_rol: parent.id_rol} })
            }
        },
        estado: { type: GraphQLInt }
    })
})
