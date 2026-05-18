import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "")
debugging = os.getenv("DATABASE_DEBUG", "false").lower() == "true"

engine = sa.create_engine(DATABASE_URL, echo=debugging)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()
