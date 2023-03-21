import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Rol extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_rol!: number

    @Column()
    nombre!: string

    @Column()
    estado!: number
}
