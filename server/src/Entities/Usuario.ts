import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_usuario!: number

    @Column()
    usuario!: string

    @Column()
    nombre!: string

    @Column()
    contrasena!: string

    @Column()
    email!: string

    @Column()
    id_rol!: number

    @Column()
    estado!: number
}
