import { useEffect, useState } from "react";
import type { Usuario } from "../lib/types";
import { api } from "../lib/api";
import Tabla from "./Tabla";
import FormularioUsuario from "./FormularioUsuario";

export default function PageUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editando, setEditando] = useState<Usuario | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  async function cargar() {
    const data = await api.usuarios.listar();
    setUsuarios(data);
  }

  useEffect(() => {
    cargar();
  }, []);

  function handleEditar(u: Usuario) {
    setEditando(u);
    setMostrarForm(true);
  }

  async function handleEliminar(id: number) {
    if (!confirm("¿Eliminar usuario?")) return;
    await api.usuarios.eliminar(id);
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
        <FormularioUsuario
          editando={editando}
          onGuardar={handleGuardar}
          onCancelar={handleCancelar}
        />
      )}

      <button className="btn btn-crear" onClick={() => setMostrarForm(true)}>
        Nuevo Usuario
      </button>

      <Tabla
        data={usuarios}
        columns={[
          { key: "id", label: "ID" },
          { key: "nombre", label: "Nombre" },
          { key: "email", label: "Email" },
        ]}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
    </div>
  );
}
