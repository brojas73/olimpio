import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TareaExterna } from "./TareaExterna";

@Entity()
export class TipoServicio extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tipo_servicio!: number

    @Column()
    nombre!: string

    @Column()
    estado!: number
}
