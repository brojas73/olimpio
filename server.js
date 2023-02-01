import express from "express"
import mysql from "mysql"

// const express = require('express');
// const db = require('../db')
// const cors = require('cors');

const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "olimpio"  
})

const PORT = 8080
// app.use(cors());
app.use(express.json())

app.use('/login', (req, res) => {
    res.send({
        token: 'test123'
    })
})

app.use('/sucursales', (req, res) => {
    const q = 'select * from sucursal'
    db.query(q, (err, result) => {
        if (err) {
            console.log(err)
        }

        res.send(result)
    })
})

app.use('/tipos-trabajo', (req, res) => {
    const q = 'select * from tipo_trabajo'
    db.query(q, (err, result) => {
        if (err) {
            console.log(err)
        }

        res.send(result)
    })
})

app.use('/tipos-servicio', (req, res) => {
    const q = 'select * from tipo_servicio'
    db.query(q, (err, result) => {
        if (err) {
            console.log(err)
        }

        res.send(result)
    })
})

app.use('/estado-tarea', (req, res) => {
    const q = 'select * form estado_tarea'
    db.query(q, (err, result) => {
        if (err) {
            console.log(err)
        }

        res.send(result)
    })
})

app.use('/tareas-externas-activas', (req, res) => {
    const q = 'select * from tarea_externa'
    db.query(q, (err, result) => {
        if (err) {
            console.log(err)
        }

        res.send(result)
    })
})

app.listen(PORT, () => console.log(`API is running on http://localhost:${PORT}`));
