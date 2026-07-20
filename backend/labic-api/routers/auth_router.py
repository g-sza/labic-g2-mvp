from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

# imports internos
from database import get_db
from models.pesquisadores import PesquisadorModel
from core.security import verificar_senha, criar_token_acesso

router = APIRouter(prefix="/auth", tags=["Autenticação"])

@router.post("/login")
def login(dados_login: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # busca o usuário no banco de dados usando o email
    usuario = db.query(PesquisadorModel).filter(PesquisadorModel.email == dados_login.username).first()

    if not usuario or not verificar_senha(dados_login.password, usuario.senha_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # prepara dados do token
    dados_token = {
        "sub": str(usuario.id_pesquisador)
    }

    # gera token
    token = criar_token_acesso(dados_usuario=dados_token)

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.post("/logout")
def logout():
    return {"mensagem": "Logout realizado."}