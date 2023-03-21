import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TareaExternaLog } from "./TareaExternaLog";

@Entity()
export class TipoAccion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tipo_accion!: number

    @Column()
    nombre!: string

    @Column()
    estado!: number
}
