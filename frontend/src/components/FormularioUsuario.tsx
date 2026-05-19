import { type FormEvent, useState } from "react";
import type { Usuario, UsuarioIn } from "../lib/types";
import { api } from "../lib/api";

interface Props {
  editando?: Usuario | null
  onGuardar: () => void
  onCancelar: () => void
}

export default function FormularioUsuario({ editando, onGuardar, onCancelar }: Props) {
  const [nombre, setNombre] = useState(editando?.nombre ?? "");
  const [email, setEmail] = useState(editando?.email ?? "");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const data: UsuarioIn = { nombre, email, contraseña };
    if (!nombre || !email || (!editando && !contraseña)) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (!contraseña && editando) {
      setError("La contraseña es obligatoria");
      return;
    }

    try {
      if (editando) {
        await api.usuarios.actualizar(editando.id, data);
      } else {
        await api.usuarios.crear(data);
      }
      onGuardar();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h3>{editando ? "Editar Usuario" : "Nuevo Usuario"}</h3>

      <label>
        Nombre
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </label>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Contraseña
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          placeholder={editando ? "Nueva contraseña" : undefined}
        />
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
