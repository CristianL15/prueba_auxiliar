from sqlalchemy import String, Float
from sqlalchemy.orm import Mapped, mapped_column
from backend.database.database import Base


class Producto(Base):
    __tablename__ = "productos"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    precio: Mapped[float] = mapped_column(Float, nullable=False)
    url: Mapped[str] = mapped_column(String(255), nullable=False)
