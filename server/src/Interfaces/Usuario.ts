import { Rol } from "../Entities/Rol"

export interface IUsuario  {
    id_usuario: number
    usuario: string
    nombre: string
    contrasena: string
    email: string
    id_rol: number
    // rol: Rol
    estado: number
}
