import { useState } from "react"

export const useSessionStorage = (llave, valorPorOmision) => {
    const [valorAlmacenado, setValorAlmacenado] = useState(() => {
        try {
            // Obtenemos el valor almacenado en el browser
            const valor = localStorage.getItem(llave)

            // Si no hay valor almacenado para la llave
            if (!valor) {
                // Regresamos el valor por omisión
                localStorage.setItem(llave, JSON.stringify(valorPorOmision))
                return valorPorOmision
            // La llave ya tiene un valor almacenado
            } else {
                // Regresamos ese valor
                return valor
            }
        } catch (err) {
            return valorPorOmision
        }
    })

    const asignaValorAlmacenado = (valor) => {
        try {
            localStorage.setItem(llave, JSON.stringify(valor))
        } catch (err) {}
        setValorAlmacenado(valor)
    }

    return [valorAlmacenado, asignaValorAlmacenado]
}


