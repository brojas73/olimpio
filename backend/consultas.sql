        select   te.id_tarea_externa,
                 te.id_sucursal_origen,
                 te.ticket,
                 te.descripcion,
                 te.id_tipo_trabajo,
                 te.id_sucursal_destino,
                 te.fecha_requerida,
                 te.hora_requerida,
                 te.id_tipo_servicio,
                 te.id_estado_tarea,
                 convert_tz(te.fecha_creacion, @@session.time_zone, '-05:00') as fecha_creacion,
                 te.id_creado_por,
                 convert_tz(te.fecha_modificacion, @@session.time_zone, '-05:00') as fecha_modificacion,
                 te.id_modificado_por,
                 te.estado 
           from  tarea_externa te
           where te.id_estado_tarea = 3
           and   te.estado = 1
           and   concat(te.fecha_requerida, ' ', te.hora_requerida) < date_add(curdate(), interval 1 day)
           and   te.id_sucursal_destino = 1 
        order by te.fecha_creacion  ;