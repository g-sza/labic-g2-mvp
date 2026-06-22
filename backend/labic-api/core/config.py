import os
from dotenv import load_dotenv
from passlib.context import CryptContext

# carregando informações do .env
load_dotenv()

class Settings:
    # configurações de segurança
    SECRET_KEY: str = os.getenv("SECRET_KEY", "")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # define o local do banco de dados
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://usuario:senha@localhost/labic_db")

    # links confiáveis para manipular API
    CORS_ORIGINS: list = [
        "http://localhost:3000",  # React/Next.js
        "http://localhost:5173",  # Vite/Vue
        "http://127.0.0.1:8000", # TODO link do site do labic
    ]

settings = Settings()