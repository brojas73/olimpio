import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TareaExterna } from "./TareaExterna";

@Entity()
export class Sucursal extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id_sucursal!: number

    @Column()
    nombre!: string

    @Column()
    estado!: number

    @OneToMany(type => TareaExterna, tarea_externa => tarea_externa.sucursal_origen)
    tareas_externas_origen!: TareaExterna[]

    @OneToMany(type => TareaExterna, tarea_externa => tarea_externa.sucursal_destino)
    tareas_externas_destino!: TareaExterna[]
}

