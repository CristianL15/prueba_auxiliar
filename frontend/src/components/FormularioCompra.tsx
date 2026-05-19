import { type FormEvent, useState } from "react";
import type { Compra, CompraIn, Usuario, Producto } from "../lib/types";
import { api } from "../lib/api";

interface Props {
  usuarios: Usuario[]
  productos: Producto[]
  onGuardar: () => void
  onCancelar: () => void
}

export default function FormularioCompra({ usuarios, productos, onGuardar, onCancelar }: Props) {
  const [usuario_id, setUsuarioId] = useState("");
  const [producto_id, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!usuario_id || !producto_id || !cantidad) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const data: CompraIn = {
      usuario_id: Number(usuario_id),
      producto_id: Number(producto_id),
      cantidad: Number(cantidad),
    };

    try {
      await api.compras.crear(data);
      onGuardar();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h3>Nueva Compra</h3>

      <label>
        Usuario
        <select value={usuario_id} onChange={(e) => setUsuarioId(e.target.value)}>
          <option value="">Seleccionar usuario</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre} ({u.email})
            </option>
          ))}
        </select>
      </label>
      <label>
        Producto
        <select value={producto_id} onChange={(e) => setProductoId(e.target.value)}>
          <option value="">Seleccionar producto</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} — ${p.precio}
            </option>
          ))}
        </select>
      </label>
      <label>
        Cantidad
        <input type="number" min="1" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
      </label>

      {error && <p className="error">{error}</p>}

      <div className="form-acciones">
        <button type="submit" className="btn btn-guardar">Crear</button>
        <button type="button" className="btn btn-cancelar" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
}
