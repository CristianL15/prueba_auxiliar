from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from backend.database.database import Base


class Compra(Base):
    __tablename__ = "compras"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    producto_id = Column(Integer, ForeignKey("productos.id"), nullable=False)
    total_productos = Column(Integer, nullable=False)
    usuario = relationship("Usuario")
    producto = relationship("Producto")
