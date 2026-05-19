const BASE = "http://localhost:8000";

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
    listar: () => request<import("./types").Usuario[]>("/usuarios/"),
    obtener: (id: number) => request<import("./types").Usuario>(`/usuarios/${id}`),
    crear: (data: import("./types").UsuarioIn) =>
      request<import("./types").Usuario>("/usuarios/", { method: "POST", body: JSON.stringify(data) }),
    actualizar: (id: number, data: import("./types").UsuarioIn) =>
      request<import("./types").Usuario>(`/usuarios/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    eliminar: (id: number) =>
      request<{ detail: string }>(`/usuarios/${id}`, { method: "DELETE" }),
  },
  productos: {
    listar: () => request<import("./types").Producto[]>("/productos/"),
    obtener: (id: number) => request<import("./types").Producto>(`/productos/${id}`),
    crear: (data: import("./types").ProductoIn) =>
      request<import("./types").Producto>("/productos/", { method: "POST", body: JSON.stringify(data) }),
    actualizar: (id: number, data: import("./types").ProductoIn) =>
      request<import("./types").Producto>(`/productos/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    eliminar: (id: number) =>
      request<{ detail: string }>(`/productos/${id}`, { method: "DELETE" }),
  },
  compras: {
    listar: () => request<import("./types").Compra[]>("/compras/"),
    obtener: (id: number) => request<import("./types").Compra>(`/compras/${id}`),
    crear: (data: import("./types").CompraIn) =>
      request<import("./types").Compra>("/compras/", { method: "POST", body: JSON.stringify(data) }),
    eliminar: (id: number) =>
      request<{ detail: string }>(`/compras/${id}`, { method: "DELETE" }),
  },
};
