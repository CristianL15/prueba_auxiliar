from pydantic import BaseModel
from datetime import date

class Compra(BaseModel):
  id: int
  usuarioId: int
  productoId: int
  cantidad: int
  precio: float
  fecha: date