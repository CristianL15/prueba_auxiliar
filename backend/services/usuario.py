from sqlalchemy.orm import Session
from backend.models.usuario import Usuario

def listarUsuarios(db: Session):
  return db.query(Usuario).all()


def obtenerUsuario(usuarioId: int, db: Session):
  return db.query(Usuario).filter(Usuario.id == usuarioId).first()


def crearUsuario(usuario: Usuario, db: Session):
  dbUsuario = Usuario(nombre=usuario.nombre, email=usuario.email, contraseña=usuario.contraseña)
  db.add(dbUsuario)
  db.commit()
  db.refresh(dbUsuario)
  return dbUsuario


def actualizarUsuario(usuarioId: int, usuario: Usuario, db: Session):
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
