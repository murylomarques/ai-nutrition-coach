import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Pega a URL do .env. Se não tiver, usa o arquivo local (segurança)
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./nutrition.db")

# Ajuste técnico: O Postgres não aceita o argumento check_same_thread (só o SQLite aceita)
if "sqlite" in SQLALCHEMY_DATABASE_URL:
    connect_args = {"check_same_thread": False}
else:
    connect_args = {}

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args=connect_args
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()