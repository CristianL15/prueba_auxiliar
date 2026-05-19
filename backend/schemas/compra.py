from pydantic import BaseModel


class CompraIn(BaseModel):
    usuario_id: int
    producto_id: int
    cantidad: int


class CompraOut(BaseModel):
    id: int
    usuario_id: int
    producto_id: int
    cantidad: int

    class Config:
        from_attributes = True
