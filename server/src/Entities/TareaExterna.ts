import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EstadoTarea } from "./EstadoTarea";
import { Sucursal } from "./Sucursal";
import { TareaExternaLog } from "./TareaExternaLog";
import { TipoServicio } from "./TipoServicio";
import { TipoTrabajo } from "./TipoTrabajo";
import { Usuario } from "./Usuario";

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

    @Column({type: 'date'})
    fecha_requerida!: string

    @Column({type: 'time'})
    hora_requerida!: string

    @Column()
    id_tipo_servicio!: number

    @Column()
    id_estado_tarea!: number

    @CreateDateColumn()
    fecha_creacion!: Date

    @Column()
    id_creado_por!: number

    @UpdateDateColumn()
    fecha_modificacion!: Date

    @Column()
    id_modificado_por!: number

    @Column()
    estado!: number
}
