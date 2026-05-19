#!/usr/bin/env python3
import os
import sys
from dotenv import load_dotenv
import pymysql

load_dotenv()


def crear_base_datos():
    host = os.getenv("DATABASE_HOST", "localhost")
    user = os.getenv("DATABASE_USER", "root")
    password = os.getenv("DATABASE_PASSWORD", "")
    database = os.getenv("DATABASE_NAME", "crud")

    connection = pymysql.connect(
        host=host,
        user=user,
        password=password,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    try:
        with connection.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database}")
    finally:
        connection.close()


if __name__ == "__main__":
    print("Inicializando base de datos")
    crear_base_datos()
    print("Base de datos inicializada correctamente")
