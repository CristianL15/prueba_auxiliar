import { useEffect, useState } from "react";
import type { Compra, Usuario, Producto } from "../lib/types";
import { api } from "../lib/api";
import Tabla from "./Tabla";
import FormularioCompra from "./FormularioCompra";

export default function PageCompras() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);

  async function cargar() {
    const [comprasData, usuariosData, productosData] = await Promise.all([
      api.compras.listar(),
      api.usuarios.listar(),
      api.productos.listar(),
    ]);
    setCompras(comprasData);
    setUsuarios(usuariosData);
    setProductos(productosData);
  }

  useEffect(() => {
    cargar();
  }, []);

  async function handleEliminar(id: number) {
    if (!confirm("¿Eliminar compra?")) return;
    await api.compras.eliminar(id);
    cargar();
  }

  function handleGuardar() {
    setMostrarForm(false);
    cargar();
  }

  function nombreUsuario(id: number) {
    return usuarios.find((u) => u.id === id)?.nombre ?? id;
  }

  function nombreProducto(id: number) {
    return productos.find((p) => p.id === id)?.nombre ?? id;
  }

  return (
    <div>
      {mostrarForm && (
        <FormularioCompra
          usuarios={usuarios}
          productos={productos}
          onGuardar={handleGuardar}
          onCancelar={() => setMostrarForm(false)}
        />
      )}

      <button className="btn btn-crear" onClick={() => setMostrarForm(true)}>
        Nueva Compra
      </button>

      <Tabla
        data={compras}
        columns={[
          { key: "id", label: "ID" },
          { key: "usuario_id", label: "Usuario" },
          { key: "producto_id", label: "Producto" },
          { key: "cantidad", label: "Cantidad" },
        ]}
        onEliminar={handleEliminar}
      />
    </div>
  );
}
