from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.database import get_db
from backend.schemas.usuario import UsuarioIn, UsuarioOut
from backend.services import usuario as servicioUsuario

router = APIRouter(prefix="/usuarios")

@router.get("/", response_model=list[UsuarioOut])
def listarUsuarios(db: Session = Depends(get_db)):
  return servicioUsuario.listarUsuarios(db)


@router.get("/{usuarioId}", response_model=UsuarioOut)
def obtenerUsuario(usuarioId: int, db: Session = Depends(get_db)):
  usuario = servicioUsuario.obtenerUsuario(usuarioId, db)
  if not usuario:
    raise HTTPException(status_code=404, detail="Usuario no encontrado")
  return usuario


@router.post("/", response_model=UsuarioOut)
def crearUsuario(usuario: UsuarioIn, db: Session = Depends(get_db)):
  return servicioUsuario.crearUsuario(usuario, db)


@router.put("/{usuarioId}", response_model=UsuarioOut)
def actualizarUsuario(usuarioId: int, usuario: UsuarioIn, db: Session = Depends(get_db)):
  dbUsuario = servicioUsuario.actualizarUsuario(usuarioId, usuario, db)
  if not dbUsuario:
    raise HTTPException(status_code=404, detail="Usuario no encontrado")
  return dbUsuario


@router.delete("/{usuarioId}")
def eliminarUsuario(usuarioId: int, db: Session = Depends(get_db)):
  usuario = servicioUsuario.eliminarUsuario(usuarioId, db)
  if not usuario:
    raise HTTPException(status_code=404, detail="Usuario no encontrado")
  return {"detail": "Usuario eliminado exitosamente"}

