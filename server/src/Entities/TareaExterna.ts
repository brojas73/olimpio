import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EstadoTarea } from "./EstadoTarea";
import { Sucursal } from "./Sucursal";
import { TareaExternaLog } from "./TareaExternaLog";
import { TipoServicio } from "./TipoServicio";
import { TipoTrabajo } from "./TipoTrabajo";
import { Usuario } from "./Usuario";

@Entity()
export class TareaExterna extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tarea_externa!: number

    // @Column()
    // id_sucursal_origen!: number
    @ManyToOne(type => Sucursal, sucursal => sucursal.tareas_externas_origen)
    sucursal_origen!: Sucursal

    @Column()
    ticket!: string

    @Column()
    descripcion!: string

    // @Column()
    // id_tipo_trabajo!: number
    @ManyToOne(type => TipoTrabajo, tipo_trabajo => tipo_trabajo.tareas_externas)
    tipo_trabajo!: TipoTrabajo

    // @Column()
    // id_sucursal_destino!: number
    @ManyToOne(type => Sucursal, sucursal => sucursal.tareas_externas_destino)
    sucursal_destino!: Sucursal

    @Column({type: 'date'})
    fecha_requerida!: string

    @Column({type: 'time'})
    hora_requerida!: string

    // @Column()
    // id_tipo_servicio!: number
    @ManyToOne(type => TipoServicio, tipo_servicio => tipo_servicio.tareas_externas)
    tipo_servicio!: TipoServicio

    // @Column()
    // id_estado_tarea!: number
    @ManyToOne(type => EstadoTarea, estado_tarea => estado_tarea.tareas_externas)
    estado_tarea!: EstadoTarea

    @CreateDateColumn()
    fecha_creacion!: Date

    // @Column()
    // id_creado_por!: number
    @ManyToOne(type => Usuario, usuario => usuario.creados_por)
    creado_por!: Usuario

    @UpdateDateColumn()
    fecha_modificacion!: Date

    // @Column()
    // id_modificado_por!: number
    @ManyToOne(type => Usuario, usuario => usuario.modificados_por)
    modificado_por!: Usuario

    @Column()
    estado!: number

    @OneToMany(type => TareaExternaLog, tarea_externa_log => tarea_externa_log.tarea_externa)
    tareas_externas_log!: TareaExternaLog[]
}
