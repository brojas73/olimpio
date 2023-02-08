import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "olimpio"  
})

const PORT = 8080
app.use(cors());
app.use(express.json())

app.post('/login', (req, res) => {
    const usuario = req.body.usuario
    const contrasena = req.body.contrasena
    const q = 'select * from usuario where usuario = ? and contrasena = ? and estado = 1'

    db.query(q, [usuario, contrasena], (err, data) => {
        if (err) {
            res.send(err)
        } 

        if (data) {
            res.send(data)
        } else {
            res.send({ mensaje: 'Combinación de usuario/contraseña no encontrada'})
        }
    })
})

app.use('/sucursales', (req, res) => {
    const q = 'select * from sucursal where estado = 1'
    db.query(q, (err, data) => {
        if (err) {
            res.send(err)
        }

        res.send(data)
    })
})

app.use('/roles', (req, res) => {
    const q = 'select * from rol where estado = 1'
    db.query(q, (err, data) => {
        if (err) {
            res.send(err)
        }

        res.send(data)
    })
})

app.use('/usuarios', (req, res) => {
    const q = 'select * from usuario where estado = 1'
    db.query(q, (err, data) => {
        if (err) {
            res.send(err)
        }

        res.send(data)
    })
})

app.use('/tipos-trabajo', (req, res) => {
    const q = 'select * from tipo_trabajo where estado = 1'
    db.query(q, (err, data) => {
        if (err) {
            res.send(err)
        }

        res.send(data)
    })
})

app.use('/tipos-servicio', (req, res) => {
    const q = 'select * from tipo_servicio where estado = 1'
    db.query(q, (err, data) => {
        if (err) {
            res.send(err)
        }

        res.send(data)
    })
})

app.use('/estados-tarea', (req, res) => {
    const q = 'select * from estado_tarea where estado = 1'
    db.query(q, (err, data) => {
        if (err) {
            res.send(err)
        }

        res.send(data)
    })
})

app.use('/tareas-externas-activas', (req, res) => {
    const q = 'select * from tarea_externa where id_estado_tarea < 7 and estado = 1'
    db.query(q, (err, data) => {
        if (err) {
            res.send(err)
        }

        res.send(data)
    })
})

app.get('/tareas-externas', (req, res) => {
    const q = 'select * from tarea_externa where estado = 1'
    db.query(q, (err, data) => {
        if (err) {
            res.send(err)
        }

        res.send(data)
    })
})

app.post("/tareas-externas", (req, res) => {
    const q = 'insert into tarea_externa (' +  
              ' id_sucursal_origen, ' +
              ' ticket, ' +
              ' descripcion, ' +
              ' id_tipo_trabajo, ' +
              ' id_sucursal_destino, ' +
              ' fecha_requerida, ' +
              ' hora_requerida, ' +
              ' id_tipo_servicio, ' + 
              ' id_estado_tarea, ' +
              ' id_creado_por,' +
              ' id_modificado_por,' +
              ' estado' +
              ') values (?)' 
    const values = [
        req.body.id_sucursal_origen, 
        req.body.ticket, 
        req.body.descripcion,
        req.body.id_tipo_trabajo,
        req.body.id_sucursal_destino,
        req.body.fecha_requerida,
        req.body.hora_requerida,
        req.body.id_tipo_servicio,
        req.body.id_estado_tarea,
        req.body.id_creado_por,
        req.body.id_creado_por,
        req.body.estado
    ]

    db.query(q, [values], (err, data) => {
        if (err) res.send(err)
        res.send({"status": 200, "mensaje": "La tarea se creó exitosamente"})
    })
})

app.delete('/tareas-externas/:id_tarea_externa', (req, res) => {
    try {
        const idTareaExterna = req.params.id_tarea_externa
        const q = 'delete from tarea_externa where id_tarea_externa = ?'
        db.query(q, [idTareaExterna], (err, data) => {
            if (err) res.send(err)
            res.send({"status": 200, "mensaje": "La tarea se borró exitosamente"})
        })
    } catch (err) {
        console.log('delete', err)
    }
})


app.put('/tareas-externas/:id_tarea_externa/:id_estado_tarea/:id_usuario', (req, res) => {
    try {
        const idUsuario = req.params.id_usuario
        const idTareaExterna = req.params.id_tarea_externa
        const idEstadoTarea = req.params.id_estado_tarea
        const q = 'update   tarea_externa ' +
                  '     set fecha_modificacion = CURRENT_TIMESTAMP,' +
                  '         id_modificado_por = ?, ' +
                  '         id_estado_tarea = ? ' +
                  ' where   id_tarea_externa = ?'
        db.query(q, [idUsuario, idEstadoTarea, idTareaExterna], (err, data) => {
            if (err) res.send(err)
            res.send({"status": 200, "mensaje": "El estado se cambió con éxito"})
        })
    } catch (err) {
        console.log('update', err)
    }
})

app.listen(PORT, () => console.log(`API is running on http://localhost:${PORT}`));
