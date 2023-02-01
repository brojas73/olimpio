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
    const q = 'select * from sucursal'
    db.query(q, (err, data) => {
        if (err) {
            res.send(err)
        }

        res.send(data)
    })
})

app.use('/tipos-trabajo', (req, res) => {
    const q = 'select * from tipo_trabajo'
    db.query(q, (err, data) => {
        if (err) {
            res.send(err)
        }

        res.send(data)
    })
})

app.use('/tipos-servicio', (req, res) => {
    const q = 'select * from tipo_servicio'
    db.query(q, (err, data) => {
        if (err) {
            res.send(err)
        }

        res.send(data)
    })
})

app.use('/estado-tarea', (req, res) => {
    const q = 'select * from estado_tarea'
    db.query(q, (err, data) => {
        if (err) {
            res.send(err)
        }

        res.send(data)
    })
})

app.use('/tareas-externas-activas', (req, res) => {
    const q = 'select * from tarea_externa where id_estado_tarea < 7'
    db.query(q, (err, data) => {
        if (err) {
            res.send(err)
        }

        res.send(data)
    })
})

app.get('/tareas-externas', (req, res) => {
    const q = 'select * from tarea_externa'
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
        req.body.estado
    ]

    db.query(q, [values], (err, data) => {
        if (err) res.send(err)
        res.send("La tarea externa se creó exitosamente")
    })
})

app.delete('/tareas-externas/:id_tarea_externa', (req, res) => {
    const idTareaExterna = req.params.id_tarea_externa
    const q = 'delete tarea_externa where id_tarea_externa = ?'
    db.query(q, [idTareaExterna], (err, data) => {
        if (err) res.send(err)
        res.send("La tarea externa se borró con éxito")
    })
})


app.put('/tareas-externas/:id_tarea_externa/:id_estado_tarea', (req, res) => {
    const idTareaExterna = req.params.id_tarea_externa
    const idEstadoTarea = req.params.id_estado_tarea
    const q = 'update tarea_externa set id_estado_tarea = ? where id_tarea_externa = ?'
    db.query(q, [idEstadoTarea, idTareaExterna], (err, data) => {
        if (err) res.send(err)
        res.send("El estado se cambió con éxito")
    })
})

app.listen(PORT, () => console.log(`API is running on http://localhost:${PORT}`));
