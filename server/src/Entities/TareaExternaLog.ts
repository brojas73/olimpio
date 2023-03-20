import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EstadoTarea } from "./EstadoTarea";
import { TareaExterna } from "./TareaExterna";
import { TipoAccion } from "./TipoAccion";
import { Usuario } from "./Usuario";

@Entity()
export class TareaExternaLog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tarea_externa_log!: number

    // @Column()
    // id_tarea_externa!: number
    @ManyToOne(type => TareaExterna, tarea_externa => tarea_externa.tareas_externas_log)
    tarea_externa!: TareaExterna

    // @Column()
    // id_tipo_accion!: number
    @ManyToOne(type => TipoAccion, tipo_accion => tipo_accion.tareas_externas_log)
    tipo_accion!: TipoAccion

    @CreateDateColumn()
    fecha!: Date

    // @Column()
    // id_usuario!: number
    @ManyToOne(type => Usuario, usuario => usuario.tareas_externas_log)
    usuario!: Usuario

    // @Column()
    // id_estado_tarea_ini!: number
    @ManyToOne(type => EstadoTarea, estado_tarea => estado_tarea.tareas_externas_log_ini)
    estado_tarea_ini!: EstadoTarea

    // @Column()
    // id_estado_tarea_fin!: number
    @ManyToOne(type => EstadoTarea, estado_tarea => estado_tarea.tareas_externas_log_fin)
    estado_tarea_fin!: EstadoTarea
}
