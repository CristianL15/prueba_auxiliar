from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database.database import engine, Base
from backend.controllers import usuarios, productos, compra
import uvicorn

app = FastAPI(title="CRUD API")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(usuarios.router)
app.include_router(productos.router)
app.include_router(compra.router)

@app.on_event("startup")
def startup():
  Base.metadata.create_all(bind=engine)