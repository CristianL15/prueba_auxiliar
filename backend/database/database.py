import sqlalchemy as sa
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("DATABASE_URL")
engine = sa.create_engine(url) # type: ignore

