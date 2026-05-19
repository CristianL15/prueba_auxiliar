export interface Usuario {
  id: number
  nombre: string
  email: string
}

export interface UsuarioIn {
  nombre: string
  email: string
  contraseña: string
}

export interface Producto {
  id: number
  nombre: string
  precio: number
  url: string
}

export interface ProductoIn {
  nombre: string
  precio: number
  url: string
}

export interface Compra {
  id: number
  usuario_id: number
  producto_id: number
  cantidad: number
}

export interface CompraIn {
  usuario_id: number
  producto_id: number
  cantidad: number
}
