from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["Autenticação"])

@router.post("/login")
def login(dados: dict):
    return {"mensagem": "Rota de login - será implementada na fase 2"}

@router.post("/logout")
def logout():
    return {"mensagem": "Rota de logout - será implementada na fase 2"}