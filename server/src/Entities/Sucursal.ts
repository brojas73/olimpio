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
}

