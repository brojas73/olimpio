export interface ITareaExterna  {
    id_tarea_externa: number
    id_sucursal_origen: number
    ticket: string
    descripcion: string
    id_tipo_trabajo: number
    id_sucursal_destino: number
    fecha_requerida: string
    hora_requerida: string
    id_tipo_servicio: number
    id_estado_tarea: number
    id_creado_por: number
    fecha_modificacion: Date
    id_modificado_por: number
    estado: number
}
