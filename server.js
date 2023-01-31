const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const STATUS_TAREA = {
    PENDIENTE_RECOLECCION: '1',
    RECOLECTADO_PARA_ATENDERSE: '2',
    RECIBIDO_PARA_ATENDERSE: '3',
    TERMINADO_PARA_RECOLECTAR: '4',
    RECOLECTADO_PARA_ENTREGA: '5',
    ENTREGADO_A_SUCURSAL_ORIGEN: '6'
} 

app.use('/login', (req, res) => {
    res.send({
        token: 'test123'
    })
})

app.use('/sucursales', (req, res) => {
    res.send({
        sucursales: [
            {id: '1', nombre: 'Balbuena'},
            {id: '2', nombre: 'Eje 1 Norte'},
            {id: '3', nombre: 'Moctezuma'},
            {id: '4', nombre: 'Oceanía'}
        ]
    })
})

app.use('/tipos-trabajo', (req, res) => {
    res.send({
        tiposTrabajo: [
            { id: '1', nombre: 'Lavandería'},
            { id: '2', nombre: 'Tintorería'},
            { id: '3', nombre: 'Planchado'},
            { id: '4', nombre: 'Compostura'},
        ]        
    })
})

app.use('/tipos-servicio', (req, res) => {
    res.send({
        tiposServicio: [
            { id: '1', nombre: 'Normal' },
            { id: '2', nombre: 'Exprés' },
        ]        
    })
})

app.use('/tareas-externas', (req, res) => {
    res.send({
        tareasExternas: [
            {id: 1,  ticket: '11111', descripcion: 'descripcion 1', tipoTrabajo: '1', sucursalOrigen: '2', sucursalDestino: '1', fechaRequerida: '2023-01-25', horaRequerida: '20:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 2,  ticket: '22222', descripcion: 'descripcion 2', tipoTrabajo: '2', sucursalOrigen: '1', sucursalDestino: '2', fechaRequerida: '2023-01-26', horaRequerida: '08:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 3,  ticket: '33333', descripcion: 'descripcion 3', tipoTrabajo: '3', sucursalOrigen: '1', sucursalDestino: '3', fechaRequerida: '2023-01-27', horaRequerida: '09:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 4,  ticket: '44444', descripcion: 'descripcion 4', tipoTrabajo: '4', sucursalOrigen: '1', sucursalDestino: '4', fechaRequerida: '2023-01-28', horaRequerida: '10:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 5,  ticket: '55555', descripcion: 'descripcion 5', tipoTrabajo: '1', sucursalOrigen: '2', sucursalDestino: '1', fechaRequerida: '2023-01-29', horaRequerida: '11:30', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 6,  ticket: '66666', descripcion: 'descripcion 6', tipoTrabajo: '2', sucursalOrigen: '3', sucursalDestino: '2', fechaRequerida: '2023-01-30', horaRequerida: '12:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 7,  ticket: '77777', descripcion: 'descripcion 7', tipoTrabajo: '3', sucursalOrigen: '4', sucursalDestino: '3', fechaRequerida: '2023-01-31', horaRequerida: '13:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 8,  ticket: '88888', descripcion: 'descripcion 8', tipoTrabajo: '4', sucursalOrigen: '3', sucursalDestino: '4', fechaRequerida: '2023-02-01', horaRequerida: '14:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 9,  ticket: '99999', descripcion: 'descripcion 9', tipoTrabajo: '1', sucursalOrigen: '4', sucursalDestino: '1', fechaRequerida: '2023-02-02', horaRequerida: '15:00', tipoServicio: '1', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 11, ticket: 'AAAAA', descripcion: 'descripcion A', tipoTrabajo: '1', sucursalOrigen: '2', sucursalDestino: '1', fechaRequerida: '2023-02-03', horaRequerida: '16:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 12, ticket: 'BBBBB', descripcion: 'descripcion B', tipoTrabajo: '2', sucursalOrigen: '1', sucursalDestino: '2', fechaRequerida: '2023-02-04', horaRequerida: '17:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 13, ticket: 'CCCCC', descripcion: 'descripcion C', tipoTrabajo: '3', sucursalOrigen: '1', sucursalDestino: '3', fechaRequerida: '2023-02-05', horaRequerida: '18:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 14, ticket: 'DDDDD', descripcion: 'descripcion D', tipoTrabajo: '4', sucursalOrigen: '1', sucursalDestino: '4', fechaRequerida: '2023-02-06', horaRequerida: '19:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 15, ticket: 'EEEEE', descripcion: 'descripcion E', tipoTrabajo: '1', sucursalOrigen: '2', sucursalDestino: '1', fechaRequerida: '2023-02-07', horaRequerida: '20:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 16, ticket: 'FFFFF', descripcion: 'descripcion F', tipoTrabajo: '2', sucursalOrigen: '3', sucursalDestino: '2', fechaRequerida: '2023-02-08', horaRequerida: '19:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 17, ticket: 'GGGGG', descripcion: 'descripcion G', tipoTrabajo: '3', sucursalOrigen: '4', sucursalDestino: '3', fechaRequerida: '2023-02-09', horaRequerida: '18:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 18, ticket: 'HHHHH', descripcion: 'descripcion H', tipoTrabajo: '4', sucursalOrigen: '3', sucursalDestino: '4', fechaRequerida: '2023-02-10', horaRequerida: '17:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
            {id: 19, ticket: 'IIIII', descripcion: 'descripcion I', tipoTrabajo: '1', sucursalOrigen: '4', sucursalDestino: '1', fechaRequerida: '2023-02-11', horaRequerida: '16:00', tipoServicio: '2', status: STATUS_TAREA.PENDIENTE_RECOLECCION},
        ]        
    })
})

app.use('/estados', (req, res) => {
    res.send({
        estados: [
            { id: STATUS_TAREA.PENDIENTE_RECOLECCION, nombre: 'Pendiente de Recolección', url: '/tracking/pendiente-recoleccion'},
            { id: STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE, nombre: 'Recolectados por Atenderse', url: '/tracking/recolectados-para-atenderse'},
            { id: STATUS_TAREA.RECIBIDO_PARA_ATENDERSE, nombre: 'Recibidos por Atenderse', url: '/tracking/recibidos-para-atenderse'},
            { id: STATUS_TAREA.TERMINADO_PARA_RECOLECTAR, nombre: 'Terminados para Recolectar', url: '/tracking/terminados-para-recolectar'},
            { id: STATUS_TAREA.RECOLECTADO_PARA_ENTREGA, nombre: 'Recolectados para Entrega', url: '/tracking/recolectados-para-entrega'},
            { id: STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN, nombre: 'Entregados a Sucursal Origen', url: '/tracking/entregados-a-sucursal-origen'},
        ]        
    })
})

app.listen(8080, () => console.log('API is running on http://localhost:8080'));



