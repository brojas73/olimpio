export function formateaFechaHora(fecha, hora, mostrarDia = true, mostrarAt = true) {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    const fechaTmp = new Date(Date.parse(fecha.substring(0, 10) + 'T' + hora))
    return (mostrarDia && dias[fechaTmp.getDay()] + ', '  ) + 
           fechaTmp.getDate() + ' ' + 
           meses[fechaTmp.getMonth()] + ' ' +
           fechaTmp.getFullYear() + 
           (mostrarAt ? ' @ ' : ' ') +
           hora.substring(0, 5) + ' hr'
}

export function formateaFecha(fecha, mostrarDia = true, mostrarAt = true) {
    const fechaTmp = new Date(fecha)
    const year = fechaTmp.getFullYear()
    const month = String(fechaTmp.getMonth() + 1).padStart(2, '0')
    const date = String(fechaTmp.getDate()).padStart(2, '0')
    const hours = String(fechaTmp.getHours()).padStart(2, '0')
    const minutes = String(fechaTmp.getMinutes()).padStart(2, '0')
    const fechaStr = `${year}-${month}-${date}`
    const hora = `${hours}:${minutes}`
    return formateaFechaHora(fechaStr, hora, mostrarDia, false, mostrarAt)
}
