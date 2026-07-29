import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from main import app
from database import Base, get_db
from models.pesquisadores import PesquisadorModel
from core.security import gerar_hash_senha

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    
    admin = PesquisadorModel(
        nome="Admin de Teste",
        email="admin@teste.com",
        senha_hash=gerar_hash_senha("123456"),
        is_admin=True
    )
    db.add(admin)
    db.commit()
    db.close()
    
    yield 
    
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def token_admin():
    response = client.post("/auth/login", data={"username": "admin@teste.com", "password": "123456"})
    return response.json()["access_token"]

def test_login_sucesso():
    """Testa se o sistema de login gera um token JWT corretamente"""
    response = client.post("/auth/login", data={"username": "admin@teste.com", "password": "123456"})
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_seguranca_criar_pesquisador_sem_token():
    """Testa se a API bloqueia a criação de dados por usuários anônimos"""
    payload = {
        "nome": "Hacker",
        "email": "hacker@teste.com",
        "senha_hash": "senha123"
    }
    response = client.post("/pesquisadores/", json=payload)
    assert response.status_code == 401 

def test_regra_negocio_artigo_publicado(token_admin):
    """Testa a validação do Pydantic: Artigos 'Publicados' exigem data e URL"""
    headers = {"Authorization": f"Bearer {token_admin}"}
    payload = {
        "titulo": "Artigo Incompleto",
        "status": "Publicado",
        "resumo": "Um resumo",
        "metodologia": "Metodologia",
        "revisao_bibliografica": "Revisão"
    }
    
    response = client.post("/artigos/", json=payload, headers=headers)
    
    assert response.status_code == 422
    assert "data de publicação" in response.text
    assert "URL do arquivo" in response.text

def test_exclusao_pesquisador_com_seguranca(token_admin):
    """Testa se a exclusão de pesquisador respeita as regras de negócio"""
    headers = {"Authorization": f"Bearer {token_admin}"}
    
    payload = {
        "nome": "Pesquisador Para Deletar",
        "email": "deletar@teste.com",
        "senha_hash": "senha123"
    }
    res_criacao = client.post("/pesquisadores/", json=payload, headers=headers)
    assert res_criacao.status_code in [200, 201]
    id_criado = res_criacao.json()["id_pesquisador"]
    
    res_delecao = client.delete(f"/pesquisadores/{id_criado}", headers=headers)
    assert res_delecao.status_code == 200