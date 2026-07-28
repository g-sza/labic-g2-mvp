import time
import jwt
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

# imports internos
from core.config import settings
from core.security import rastreador_limite
from core.logger import logger
from database import engine, Base

# imports de models
import models.pesquisadores
import models.projetos
import models.artigos

# import de rotas
from routers import (
    pesquisadores_router, 
    projetos_router, 
    artigos_router, 
    linhas_pesquisa_router, 
    auth_router
)

# criação de tabelas no banco de dados
Base.metadata.create_all(bind=engine)

# inicia API
app = FastAPI(title="LABIC API")

# registro de rotas
app.include_router(auth_router.router)
app.include_router(pesquisadores_router.router)
app.include_router(projetos_router.router)
app.include_router(artigos_router.router)
app.include_router(linhas_pesquisa_router.router)

# segurança de acesso da API
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# limitador contra força bruta em login
app.state.limiter = rastreador_limite
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# log e criador de cabecalhos para requisições
@app.middleware("http")
async def seguranca_e_auditoria(request: Request, call_next):
    tempo_inicio = time.time()
    
    ip_cliente = request.client.host if request.client else "IP Desconhecido"
    usuario_id = "Anônimo"
    cabecalho_auth = request.headers.get("Authorization")
    
    if cabecalho_auth and cabecalho_auth.startswith("Bearer "):
        token = cabecalho_auth.split(" ")[1]
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            usuario_id = f"Pesq-{payload.get('sub')}" 
        except jwt.PyJWTError:
            usuario_id = "Token_Invalido"

    resposta = await call_next(request)
    
    # proteção contra uso de iframe falso
    resposta.headers["X-Frame-Options"] = "DENY"
    # proteção contra injeção de scripts
    resposta.headers["X-Content-Type-Options"] = "nosniff"
    # ativa proteção dos navegadores contra XSS
    resposta.headers["X-XSS-Protection"] = "1; mode=block"

    tempo_processamento = time.time() - tempo_inicio
    mensagem_log = f"IP: {ip_cliente:<15} | {usuario_id:<14} | {request.method:<6} {request.url.path} | Status: {resposta.status_code} | Tempo: {tempo_processamento:.4f}s"
    
    if resposta.status_code >= 400:
        logger.warning(mensagem_log)
    else:
        logger.info(mensagem_log)

    return resposta