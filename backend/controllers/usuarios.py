from fastapi import  APIRouter
from backend.models.usuario import Usuario
from backend.services import usuario as user

router = APIRouter(prefix="/usuarios")

@router.get("/")
def listarUsuarios():
    return user.listarUsuarios


@router.get("/{usuarioId}")
def obetenerUsuario(usuarioId: int):
  return user.obtenerUsuario(usuarioId)


@router.post("/")
def crearUsuario(usuario: Usuario):
    return user.crearUsuario(usuario)


@router.put("/{usuarioId}")
def modificarUsuario(usuarioId: int, usuario: Usuario):
    return


@router.delete("/{usuarioId}")
def eliminarUsuario(usuarioId: int):
    return user.eliminarUsuario
