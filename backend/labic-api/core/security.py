from datetime import datetime, timedelta, timezone
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy.orm import Session

# imports internos
from core.config import settings
from database import get_db
from models.pesquisadores import PesquisadorModel

# inicia limitador de brute force
rastreador_limite = Limiter(key_func=get_remote_address)

# modelo de geração de hashs
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# TODO definição de link final para login
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# criação de hash para salvar em banco
def gerar_hash_senha(senha_digitada: str) -> str:
    return pwd_context.hash(senha_digitada)

# verificação de senha com hash salvo em banco
def verificar_senha(senha_digitada: str, senha_hash_usuario: str) -> bool:
    return pwd_context.verify(senha_digitada, senha_hash_usuario)

# geração de token JWT
def criar_token_acesso(dados_usuario: dict) -> str:
    conteudo_token = dados_usuario.copy()

    # gera e adiciona tempo máximo de login
    horario_atual = datetime.now(timezone.utc)
    horario_expiracao = horario_atual + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    conteudo_token.update({"exp": horario_expiracao})

    # define o token
    token_jwt = jwt.encode(
        conteudo_token,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )

    return token_jwt

# leitura e validação de token JWT
def identificar_usuario(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    
    # TODO trabalhar melhor nos erros e possíveis situações
    erro_acesso_negado = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # teste de credenciais
    try:
        credenciais = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        id_pesquisador: str = credenciais.get("sub")

        if id_pequisador is None:
            raise erro_acesso_negado
        
    except jwt.PyJWTError:
        raise erro_acesso_negado
    
    # busca de usuário
    usuario = db.query(PesquisadorModel).filter(PesquisadorModel.id_pesquisador == int(id_pesquisador)).first()
    
    if usuario is None:
        raise erro_acesso_negado
    
    return usuario

# validação de função de administrador
def verificar_permissao_admin(usuario: PesquisadorModel = Depends(identificar_usuario)):
    if not usuario.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            # TODO
            detail="",
        )
    
    return usuario

# TODO caminho para usuario que esqueceu senha