/* Guardar, Consultar y Eliminar */

export function saveLocalStorage(llave, data){
    localStorage.setItem(llave, JSON.stringify(data))
}

export function getLocalStorage(llave){
    return localStorage.getItem(llave)
}

export function removeLocalStorage(llave){
    localStorage.removeItem(llave)
}