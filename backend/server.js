const PORT = 8080

const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express();
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "olimpio"
})

app.use(cors());
app.use(express.json())

app.post('/api/login', (req, res) => {
    const usuario = req.body.usuario
    const contrasena = req.body.contrasena
    console.log('backend.loging.usuario', usuario)
    console.log('backend.loging.contrasena ', contrasena)
    const q = 'select * from usuario where usuario = ? and contrasena = ? and estado = 1'

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, [usuario, contrasena], (err, data) => {
            db.release()

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
})

app.use('/api/sucursales', (req, res) => {
    const q = 'select * from sucursal where estado = 1'
    pool.getConnection((err, db) => {
        if (err) throw err

        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.use('/api/roles', (req, res) => {
    const q = 'select * from rol where estado = 1'
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.use('/api/usuarios', (req, res) => {
    const q = `select   id_usuario,
                        usuario,
                        nombre,
                        email,
                        id_rol 
                from    usuario 
                where   estado = 1`
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }
    
            res.send(data)
            
        })
    })
})

app.use('/api/tipos-trabajo', (req, res) => {
    const q = 'select * from tipo_trabajo where estado = 1'
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.use('/api/tipos-servicio', (req, res) => {
    const q = 'select * from tipo_servicio where estado = 1'
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.use('/api/estados-tarea', (req, res) => {
    const q = 'select * from estado_tarea where estado = 1'
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.use('/api/tareas-externas-activas', (req, res) => {
    const q = 'select * from tarea_externa where id_estado_tarea < 7 and estado = 1'
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.get('/api/tareas-externas', (req, res) => {
    const q = 'select * from tarea_externa where estado = 1'
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.post("/api/tareas-externas", (req, res) => {
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

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, [values], (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }
            res.send({"status": 200, "mensaje": "La tarea se creó exitosamente"})
        })
    })
})

app.delete('/api/tareas-externas/:id_tarea_externa', (req, res) => {
    try {
        const idTareaExterna = req.params.id_tarea_externa
        const q = 'delete from tarea_externa where id_tarea_externa = ?'
        pool.getConnection((err, db) => {
            if (err) throw err
            db.query(q, [idTareaExterna], (err, data) => {
                db.release()
                if (err) {
                    console.log(err)
                    res.send(err)
                }
                res.send({"status": 200, "mensaje": "La tarea se borró exitosamente"})
            })
        }) 
    } catch (err) {
            console.log('delete', err)
    }
})


app.put('/api/tareas-externas/:id_tarea_externa/:id_estado_tarea/:id_usuario', (req, res) => {
    try {
        const idUsuario = req.params.id_usuario
        const idTareaExterna = req.params.id_tarea_externa
        const idEstadoTarea = req.params.id_estado_tarea
        const q = 'update   tarea_externa ' +
                  '     set fecha_modificacion = CURRENT_TIMESTAMP,' +
                  '         id_modificado_por = ?, ' +
                  '         id_estado_tarea = ? ' +
                  ' where   id_tarea_externa = ?'
        pool.getConnection((err, db) => {
            if (err) throw err
            db.query(q, [idUsuario, idEstadoTarea, idTareaExterna], (err, data) => {
                db.release()
                if (err) {
                    console.log(err)
                    res.send(err)
                }
                res.send({"status": 200, "mensaje": "El estado se cambió con éxito"})
            })
        }) 
    } catch (err) {
        console.log('update', err)
    }
})

app.listen(PORT, () => console.log(`API is running on http://localhost:${PORT}`));
