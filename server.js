const express = require('express');
const db = require('./db')
const cors = require('cors');
const app = express();
const PORT = 8080
app.use(cors());
app.use(express.json())

app.use('/login', (req, res) => {
    res.send({
        token: 'test123'
    })
})

app.use('/sucursales', (req, res) => {
    db.query('select * from sucursal', (err, result) => {
        if (err) {
            console.log(err)
        }

        res.send(result)
    })
})

app.use('/tipos-trabajo', (req, res) => {
    db.query('select * from tipo_trabajo', (err, result) => {
        if (err) {
            console.log(err)
        }

        res.send(result)
    })
})

app.use('/tipos-servicio', (req, res) => {
    db.query('select * from tipo_servicio', (err, result) => {
        if (err) {
            console.log(err)
        }

        res.send(result)
    })
})

app.use('/tareas-externas', (req, res) => {
    db.query('select * from tarea_externa', (err, result) => {
        if (err) {
            console.log(err)
        }

        res.send(result)
})

app.use('/estado-tarea', (req, res) => {
    db.query('select * from estado_tarea', (err, result) => {
        if (err) {
            console.log(err)
        }

        res.send(result)
    })
})

app.listen(PORT, () => console.log(`API is running on http://localhost:${PORT}`));
