interface Column<T> {
  key: keyof T
  label: string
}

interface Props<T> {
  data: T[]
  columns: Column<T>[]
  onEditar?: (item: T) => void
  onEliminar?: (id: number) => void
}

export default function Tabla<T extends { id: number }>({
  data,
  columns,
  onEditar,
  onEliminar,
}: Props<T>) {
  return (
    <table className="tabla">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan={columns.length + 1}>No hay registros</td>
          </tr>
        )}
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col) => (
              <td key={String(col.key)}>{String(item[col.key])}</td>
            ))}
            <td className="acciones">
              {onEditar && (
                <button className="btn btn-editar" onClick={() => onEditar(item)}>
                  Editar
                </button>
              )}
              {onEliminar && (
                <button className="btn btn-eliminar" onClick={() => onEliminar(item.id)}>
                  Eliminar
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
