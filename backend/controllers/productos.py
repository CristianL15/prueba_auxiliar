from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.database import get_db
from backend.schemas.producto import ProductoIn, ProductoOut
from backend.services import producto as servicioProducto

router = APIRouter(prefix="/productos")

@router.get("/", response_model=list[ProductoOut])
def listarProductos(db: Session = Depends(get_db)):
    return servicioProducto.listarProductos(db)


@router.get("/{producto_id}", response_model=ProductoOut)
def obtenerProducto(producto_id: int, db: Session = Depends(get_db)):
    producto = servicioProducto.obtenerProducto(producto_id, db)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto


@router.post("/", response_model=ProductoOut)
def crearProducto(producto: ProductoIn, db: Session = Depends(get_db)):
    return servicioProducto.crearProducto(producto, db)


@router.put("/{producto_id}", response_model=ProductoOut)
def actualizarProducto(producto_id: int, producto: ProductoIn, db: Session = Depends(get_db)):
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
