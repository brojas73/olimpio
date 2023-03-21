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
}
