from pydantic import BaseModel

class Usuario(BaseModel):
  id: int
  nombre: float
  email: str
  contraseña: str

