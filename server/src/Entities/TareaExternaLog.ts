import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EstadoTarea } from "./EstadoTarea";
import { TareaExterna } from "./TareaExterna";
import { TipoAccion } from "./TipoAccion";
import { Usuario } from "./Usuario";

@Entity()
export class TareaExternaLog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tarea_externa_log!: number

    @Column()
    id_tarea_externa!: number

    @Column()
    id_tipo_accion!: number

    @CreateDateColumn()
    fecha!: Date

    @Column()
    id_usuario!: number

    @Column()
    id_estado_tarea_ini!: number

    @Column()
    id_estado_tarea_fin!: number
}
