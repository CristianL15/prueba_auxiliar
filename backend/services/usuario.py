from sqlalchemy.orm import Session
from backend.models.usuario import Usuario
from backend.schemas.usuario import UsuarioIn

def listarUsuarios(db: Session):
  return db.query(Usuario).all()


def obtenerUsuario(usuarioId: int, db: Session):
  return db.query(Usuario).filter(Usuario.id == usuarioId).first()


def crearUsuario(usuario: UsuarioIn, db: Session):
  dbUsuario = Usuario(nombre=usuario.nombre, email=usuario.email, contraseña=usuario.contraseña)
  db.add(dbUsuario)
  db.commit()
  db.refresh(dbUsuario)
  return dbUsuario


def actualizarUsuario(usuarioId: int, usuario: UsuarioIn, db: Session):
  dbUsuario = db.query(Usuario).filter(Usuario.id == usuarioId).first()
  if dbUsuario:
    dbUsuario.nombre = usuario.nombre
    dbUsuario.email = usuario.email
    dbUsuario.contraseña = usuario.contraseña
    db.commit()
    db.refresh(dbUsuario)
  return dbUsuario


def eliminarUsuario(usuarioId: int, db: Session):
  dbUsuario = db.query(Usuario).filter(Usuario.id == usuarioId).first()
  if dbUsuario:
    db.delete(dbUsuario)
    db.commit()
  return dbUsuario
