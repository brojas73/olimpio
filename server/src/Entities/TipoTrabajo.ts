import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TareaExterna } from "./TareaExterna";

@Entity()
export class TipoTrabajo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tipo_trabajo!: number

    @Column()
    nombre!: string

    @Column()
    estado!: number

    @OneToMany(type => TareaExterna, tarea_externa => tarea_externa.tipo_trabajo)
    tareas_externas!: TareaExterna[]
}
