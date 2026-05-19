#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

cleanup() {
  echo ""
  echo "Deteniendo servicios..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
  wait $BACKEND_PID $FRONTEND_PID 2>/dev/null
  echo "Servicios detenidos."
}

trap cleanup EXIT

echo "Activando entorno virtual..."
source "$ROOT_DIR/.venv/bin/activate"

cd "$ROOT_DIR"

echo "Inicializando base de datos"
python backend/init_db.py

echo "Iniciando backend con uvicorn"
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

echo "Iniciando frontend con astro"
cd "$ROOT_DIR/frontend"
pnpm dev &
FRONTEND_PID=$!

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Backend:  http://localhost:8000"
echo "  Frontend: http://localhost:5173"
echo "  Docs API: http://localhost:8000/docs"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Presiona Ctrl+C para detener todo"
echo ""

wait
