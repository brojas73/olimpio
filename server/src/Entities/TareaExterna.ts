import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TareaExterna extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tarea_externa!: number

    @Column()
    id_sucursal_origen!: number

    @Column()
    ticket!: string

    @Column()
    descripcion!: string

    @Column()
    id_tipo_trabajo!: number

    @Column()
    id_sucursal_destino!: number

    @Column()
    nombre!: string

    @Column()
    estado!: number
}
