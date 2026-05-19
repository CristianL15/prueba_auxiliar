import { useEffect, useState } from "react";
import type { Producto } from "../lib/types";
import { api } from "../lib/api";
import Tabla from "./Tabla";
import FormularioProducto from "./FormularioProducto";

export default function PageProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [editando, setEditando] = useState<Producto | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  async function cargar() {
    const data = await api.productos.listar();
    setProductos(data);
  }

  useEffect(() => {
    cargar();
  }, []);

  function handleEditar(p: Producto) {
    setEditando(p);
    setMostrarForm(true);
  }

  async function handleEliminar(id: number) {
    if (!confirm("¿Eliminar producto?")) return;
    await api.productos.eliminar(id);
    cargar();
  }

  function handleGuardar() {
    setMostrarForm(false);
    setEditando(null);
    cargar();
  }

  function handleCancelar() {
    setMostrarForm(false);
    setEditando(null);
  }

  return (
    <div>
      {mostrarForm && (
        <FormularioProducto
          editando={editando}
          onGuardar={handleGuardar}
          onCancelar={handleCancelar}
        />
      )}

      <button className="btn btn-crear" onClick={() => setMostrarForm(true)}>
        Nuevo Producto
      </button>

      <Tabla
        data={productos}
        columns={[
          { key: "id", label: "ID" },
          { key: "nombre", label: "Nombre" },
          { key: "precio", label: "Precio" },
          { key: "url", label: "URL Imagen" },
        ]}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
    </div>
  );
}
