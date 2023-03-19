import express from "express"
import { graphqlHTTP } from "express-graphql"
import { schema } from './Schema'
import cors from "cors"
import { createConnection } from "typeorm"
import { Sucursal } from './Entities/Sucursal'
import { Rol } from './Entities/Rol'
import { EstadoTarea } from "./Entities/EstadoTarea"
import { TipoAccion } from "./Entities/TipoAccion"
import { TipoServicio } from "./Entities/TipoServicio"
import { TipoTrabajo } from "./Entities/TipoTrabajo"
import { Usuario } from "./Entities/Usuario"
import { TareaExterna } from "./Entities/TareaExterna"
import { TareaExternaLog } from "./Entities/TareaExternaLog"

const main = async () => {
    await createConnection({
        type: "mysql",
        database: "olimpio",
        username: "root",
        password: "Ol!mp!0!!@@",
        // logging: true,
        synchronize: false,
        entities: [
            EstadoTarea, Rol, Sucursal, TareaExterna, TareaExternaLog, TipoAccion, TipoServicio, TipoTrabajo, Usuario
        ],
    })

    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true
    }))

    app.listen(3010, () => {
        console.log('Sever running on port 3010')
    })
}

main().catch(err => {
    console.log(err)
})
