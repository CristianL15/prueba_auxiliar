from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.database import get_db
from backend.schemas.compra import CompraIn, CompraOut
from backend.services import compras as servicioCompras

router = APIRouter(prefix="/compras")

@router.get("/", response_model=list[CompraOut])
def listarCompras(db: Session = Depends(get_db)):
  return servicioCompras.listarCompras(db)


@router.get("/{compraId}", response_model=CompraOut)
def obtenerCompra(compraId: int, db: Session = Depends(get_db)):
  compra = servicioCompras.obtenerCompra(compraId, db)
  if not compra:
    raise HTTPException(status_code=404, detail="Compra no encontrada")
  return compra


@router.post("/", response_model=CompraOut)
def crearCompra(compra: CompraIn, db: Session = Depends(get_db)):
  return servicioCompras.crearCompra(compra, db)


@router.delete("/{compraId}")
def eliminarCompra(compraId: int, db: Session = Depends(get_db)):
  compra = servicioCompras.eliminarCompra(compraId, db)
  if not compra:
    raise HTTPException(status_code=404, detail="Compra no encontrada")
  return {"detail": "Compra eliminada exitosamente"}