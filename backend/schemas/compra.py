from pydantic import BaseModel


class CompraIn(BaseModel):
    usuario_id: int
    producto_id: int
    total_productos: int


class CompraOut(BaseModel):
    id: int
    usuario_id: int
    producto_id: int
    total_productos: int

    class Config:
        from_attributes = True
