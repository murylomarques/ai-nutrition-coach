from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Usaremos SQLite para dev (arquivo local), mas preparado para PostgreSQL em prod
SQLALCHEMY_DATABASE_URL = "sqlite:///./nutrition.db"

# check_same_thread=False é necessário apenas para SQLite
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency Injection para obter o banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()