import {
  type Usuario,
  type Producto,
  type Compra,
  type UsuarioIn,
  type ProductoIn,
  type CompraIn,
} from "./types";

const BASE = import.meta.env.API_URL || "http://localhost:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const msg = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(msg.detail ?? "Error de red");
  }
  return res.json();
}

export const api = {
  usuarios: {
    listar: () => request<Usuario[]>("/usuarios/"),
    obtener: (id: number) => request<Usuario>(`/usuarios/${id}`),
    crear: (data: UsuarioIn) =>
      request<Usuario>("/usuarios/", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    actualizar: (id: number, data: UsuarioIn) =>
      request<Usuario>(`/usuarios/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    eliminar: (id: number) =>
      request<{ detail: string }>(`/usuarios/${id}`, { method: "DELETE" }),
  },

  productos: {
    listar: () => request<Producto[]>("/productos/"),
    obtener: (id: number) => request<Producto>(`/productos/${id}`),
    crear: (data: ProductoIn) =>
      request<Producto>("/productos/", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    actualizar: (id: number, data: ProductoIn) =>
      request<Producto>(`/productos/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    eliminar: (id: number) =>
      request<{ detail: string }>(`/productos/${id}`, { method: "DELETE" }),
  },

  compras: {
    listar: () => request<Compra[]>("/compras/"),
    obtener: (id: number) => request<Compra>(`/compras/${id}`),
    crear: (data: CompraIn) =>
      request<Compra>("/compras/", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    eliminar: (id: number) =>
      request<{ detail: string }>(`/compras/${id}`, { method: "DELETE" }),
  },
};
