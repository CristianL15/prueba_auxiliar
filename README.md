# CRUD

Aplicación web para gestionar **usuarios**, **productos** y **compras** con relación N:M entre usuarios y productos a través de compras.

## Stack

| Capa         | Tecnología                            |
| ------------ | ------------------------------------- |
| Backend      | FastAPI + SQLAlchemy 2.0 + MariaDB    |
| Frontend     | Astro + React + TypeScript            |
| Cliente HTTP | fetch nativo (sin librerías externas) |

## Estructura

```
crudAuxiliar/
├── start.sh                 # Inicia backend y frontend
├── backend/
│   ├── main.py              # App FastAPI + CORS + creación automática de BD
│   ├── init_db.py           # Script para crear la BD manualmente
│   ├── models/              # Modelos SQLAlchemy (Usuario, Producto, Compra)
│   ├── schemas/             # Schemas Pydantic de entrada/salida
│   ├── services/            # Lógica de negocio
│   ├── controllers/         # Endpoints REST
│   └── database/            # Configuración de conexión
├── frontend/
│   ├── src/
│   │   ├── components/      # Tabla genérica + formularios React
│   │   ├── pages/           # Páginas Astro
│   │   ├── layouts/         # Layout con navegación y estilos
│   │   └── lib/             # Tipos TypeScript + cliente API
│   └── astro.config.mjs
└── .env                     # Variables de entorno (BD, debug)
```

## Requisitos

- Python 3.13+
- Node.js 22+
- pnpm (`npm install -g pnpm`)
- MariaDB o MySQL corriendo

## Configuración

```bash
cp .env.example .env   # y ajustar credenciales
```

## Ejecución

```bash
./start.sh
```

Esto inicia:

- **Backend** → `http://localhost:8000`
- **Documentación API** → `http://localhost:8000/docs`
- **Frontend** → `http://localhost:5173`

### O manualmente

```bash
# Inicializar BD
python backend/init_db.py

# Backend
cd backend && python init_db.py && uvicorn backend.main:app --reload --port 8000

# Frontend (otra terminal)
cd frontend && pnpm dev
```

## API

| Método | Endpoint          | Descripción         |
| ------ | ----------------- | ------------------- |
| GET    | `/usuarios/`      | Listar usuarios     |
| POST   | `/usuarios/`      | Crear usuario       |
| PUT    | `/usuarios/{id}`  | Actualizar usuario  |
| DELETE | `/usuarios/{id}`  | Eliminar usuario    |
| GET    | `/productos/`     | Listar productos    |
| POST   | `/productos/`     | Crear producto      |
| PUT    | `/productos/{id}` | Actualizar producto |
| DELETE | `/productos/{id}` | Eliminar producto   |
| GET    | `/compras/`       | Listar compras      |
| POST   | `/compras/`       | Crear compra        |
| DELETE | `/compras/{id}`   | Eliminar compra     |

## Entidades

- **Usuario**: id, nombre, email, contraseña (hasheada con bcrypt)
- **Producto**: id, nombre, precio, url
- **Compra**: id, usuario_id, producto_id, cantidad

## Por hacer:

- Tabla intermedia para poder realizar una compra con varios productos
- Contenerización de la aplicación
- Vista de productos en forma de ecommerce
