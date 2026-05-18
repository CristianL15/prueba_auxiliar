from sqlalchemy.orm import Session
from backend.models.compra import Compra

def listarCompras(db: Session):
  return db.query(Compra).all()


def obtenerCompra(compraId: int, db: Session):
  return db.query(Compra).filter(Compra.id == compraId).first()


def crearCompra(compra: Compra, db: Session):
  dbCompra = Compra(usuario_id=compra.usuario_id, producto_id=compra.producto_id, total_productos=compra.total_productos)
  db.add(dbCompra)
  db.commit()
  db.refresh(dbCompra)
  return dbCompra


def eliminarCompra(compraId: int, db: Session):
  dbCompra = db.query(Compra).filter(Compra.id == compraId).first()
  if dbCompra:
    db.delete(dbCompra)
    db.commit()
    return dbCompra