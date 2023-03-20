import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TareaExterna } from "./TareaExterna";
import { TareaExternaLog } from "./TareaExternaLog";

@Entity()
export class EstadoTarea extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_estado_tarea!: number

    @Column()
    nombre!: string

    @Column()
    estado!: number

    @ManyToOne(type => TareaExterna, tarea_externa => tarea_externa.estado_tarea)
    tareas_externas!: TareaExterna[]

    @ManyToOne(type => TareaExternaLog, tarea_externa_log => tarea_externa_log.estado_tarea_ini)
    tareas_externas_log_ini!: TareaExternaLog[]

    @ManyToOne(type => TareaExternaLog, tarea_externa_log => tarea_externa_log.estado_tarea_fin)
    tareas_externas_log_fin!: TareaExternaLog[]
}
