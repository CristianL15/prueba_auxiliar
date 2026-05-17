from pydantic import BaseModel

class Producto(BaseModel):
  id: int
  nombre: str
  precio: float
  url: str

