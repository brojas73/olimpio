import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "./Rol";
import { TareaExterna } from "./TareaExterna";
import { TareaExternaLog } from "./TareaExternaLog";

@Entity()
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_usuario!: number

    @Column({ unique: true})
    usuario!: string

    @Column()
    nombre!: string

    @Column()
    contrasena!: string

    @Column({unique: true})
    email!: string

    @Column()
    id_rol!: number

    // @ManyToOne(type => Rol, rol => rol.usuarios)
    // rol!: Rol

    @Column()
    estado!: number

    @OneToMany(type => TareaExterna, tarea_externa => tarea_externa.creado_por)
    creados_por!: TareaExterna[]

    @OneToMany(type => TareaExterna, tarea_externa => tarea_externa.modificado_por)
    modificados_por!: TareaExterna[]

    @OneToMany(type => TareaExternaLog, tarea_externa_log => tarea_externa_log.usuario)
    tareas_externas_log!: TareaExternaLog[]
}
