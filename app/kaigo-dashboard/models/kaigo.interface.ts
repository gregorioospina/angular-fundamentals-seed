export interface Cliente{
    id: number,
    nombre: string,
    email: string,
    empresas: Empresa[] | null
}
export interface Item{
    id: number,
    nombre: string,
    caracteristicas: Caracteristica[]
} 
export interface Empresa{
    id: number,
    nombre: string,
    items: Item[] | null 
}

export interface Caracteristica{
    key: string,
    value: string
}