from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.database import get_db
from backend.models.producto import Producto
from backend.services import producto as servicioProducto

router = APIRouter(prefix="/productos")

@router.get("/")
def listarProductos(db: Session = Depends(get_db)):
    return servicioProducto.listarProductos(db)


@router.get("/{producto_id}")
def obtenerProducto(producto_id: int, db: Session = Depends(get_db)):
    producto = servicioProducto.obtenerProducto(producto_id, db)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto


@router.post("/")
def crearProducto(producto: Producto, db: Session = Depends(get_db)):
    return servicioProducto.crearProducto(producto, db)


@router.put("/{producto_id}")
def actualizarProducto(producto_id: int, producto: Producto, db: Session = Depends(get_db)):
    dbProducto = servicioProducto.actualizarProducto(producto_id, producto, db)
    if not dbProducto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return dbProducto


@router.delete("/{producto_id}")
def eliminarProducto(producto_id: int, db: Session = Depends(get_db)):
    producto = servicioProducto.eliminarProducto(producto_id, db)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"detail": "Producto eliminado exitosamente"}
