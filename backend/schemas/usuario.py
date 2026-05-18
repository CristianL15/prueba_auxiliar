from pydantic import BaseModel


class UsuarioIn(BaseModel):
    nombre: str
    email: str
    contraseña: str


class UsuarioOut(BaseModel):
    id: int
    nombre: str
    email: str

    class Config:
        from_attributes = True

