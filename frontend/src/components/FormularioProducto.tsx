import { type FormEvent, useState } from "react";
import type { Producto, ProductoIn } from "../lib/types";
import { api } from "../lib/api";

interface Props {
  editando?: Producto | null
  onGuardar: () => void
  onCancelar: () => void
}

export default function FormularioProducto({ editando, onGuardar, onCancelar }: Props) {
  const [nombre, setNombre] = useState(editando?.nombre ?? "");
  const [precio, setPrecio] = useState(String(editando?.precio ?? ""));
  const [url, setUrl] = useState(editando?.url ?? "");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!nombre || !precio || !url) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const data: ProductoIn = { nombre, precio: Number(precio), url };

    try {
      if (editando) {
        await api.productos.actualizar(editando.id, data);
      } else {
        await api.productos.crear(data);
      }
      onGuardar();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h3>{editando ? "Editar Producto" : "Nuevo Producto"}</h3>

      <label>
        Nombre
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </label>
      <label>
        Precio
        <input type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} />
      </label>
      <label>
        URL de imagen
        <input value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>

      {error && <p className="error">{error}</p>}

      <div className="form-acciones">
        <button type="submit" className="btn btn-guardar">
          {editando ? "Actualizar" : "Crear"}
        </button>
        <button type="button" className="btn btn-cancelar" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
