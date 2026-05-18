from pydantic import BaseModel


class ProductoIn(BaseModel):
    nombre: str
    precio: float
    url: str


class ProductoOut(BaseModel):
    id: int
    nombre: str
    precio: float
    url: str

    class Config:
        from_attributes = True
