select   te.ticket,
         te.descripcion,
         case tel.id_tipo_accion
            when 1 then
               'Creación'
            when 2 then 
               'Borrado'
            when 3 then 
               'Actualización'
         end as tipo_accion,
         tel.fecha,
         u.nombre,
         estado_final.nombre as estado_fin,
         estado_inicial.nombre as estado_ini
   from  tarea_externa_log as tel
         inner join tarea_externa as te
            on    te.id_tarea_externa = tel.id_tarea_externa
         left outer join usuario as u
            on    u.id_usuario = tel.id_usuario
         inner join estado_tarea as estado_final
            on    estado_final.id_estado_tarea = tel.id_estado_tarea_fin
         inner join estado_tarea as estado_inicial
            on    estado_inicial.id_estado_tarea = tel.id_estado_tarea_ini
   where te.ticket like '%'
   and   te.descripcion like '%' 
order by tel.id_tarea_externa,
         tel.fecha ;