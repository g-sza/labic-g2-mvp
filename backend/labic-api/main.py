from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

# imports internos
from core.config import settings
from core.security import rastreador_limite
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

# criador de cabecalho para requisições, contra falhas de navegadores
@app.middleware("http")
async def adicionar_cabecalhos_seguranca(request: Request, call_next):
    resposta = await call_next(request)
    
    # proteção contra uso de iframe falso
    resposta.headers["X-Frame-Options"] = "DENY"
    # proteção contra injeção de scripts
    resposta.headers["X-Content-Type-Options"] = "nosniff"
    # ativa proteção dos navegadores contra XSS
    resposta.headers["X-XSS-Protection"] = "1; mode=block"

    return resposta