from sqlalchemy.orm import Session
from backend.models.producto import Producto

def listarProductos(db: Session):
  return db.query(Producto).all()


def obtenerProducto(productoId: int, db: Session):
  return db.query(Producto).filter(Producto.id == productoId).first()


def crearProducto(producto: Producto, db: Session):
  dbProducto = Producto(nombre=producto.nombre, precio=producto.precio, url=producto.url)
  db.add(dbProducto)
  db.commit()
  db.refresh(dbProducto)
  return dbProducto


def actualizarProducto(productoId: int, producto: Producto, db: Session):
  dbProducto = db.query(Producto).filter(Producto.id == productoId).first()
  if dbProducto:
    dbProducto.nombre = producto.nombre
    dbProducto.precio = producto.precio
    dbProducto.url = producto.url
    db.commit()
    db.refresh(dbProducto)
  return dbProducto


def eliminarProducto(productoId: int, db: Session):
  dbProducto = db.query(Producto).filter(Producto.id == productoId).first()
  if dbProducto:
    db.delete(dbProducto)
    db.commit()
  return dbProducto
