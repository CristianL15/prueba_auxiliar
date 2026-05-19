from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from backend.database.database import Base


class Usuario(Base):
    __tablename__ = "usuarios"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    contraseña: Mapped[str] = mapped_column(String(255), nullable=False)
