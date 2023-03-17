import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sucursal extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_sucursal!: number

    @Column({type: "string"})
    nombre!: string

    @Column()
    estado!: number
}
