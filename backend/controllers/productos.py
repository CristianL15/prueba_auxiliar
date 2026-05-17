from fastapi import  APIRouter
from backend.models.producto import Producto
from backend.services import usuario as usr

router = APIRouter(prefix="/productos")

@router.get("/")
async def listarProductos():
    return usr.listarProductos()


@router.get("/{productoId}")
async def obetenerProducto(productoId: int):
  return


@router.post("/")
async def crearProducto(producto: Producto):
    return


@router.put("/{productoId}")
async def modificarProducto(productoId: int):
    return


@router.delete("/{productoId}")
async def eliminarProducto(productoId: int):
    return