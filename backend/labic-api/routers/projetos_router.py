from fastapi import APIRouter

router = APIRouter(prefix="/projetos", tags=["Projetos"])

@router.get("/")
def listar_projetos():
    return [
        {"id": 1, "titulo": "Sistema de Reconhecimento Facial", "status": "Em andamento"},
        {"id": 2, "titulo": "Análise de Dados Climáticos", "status": "Concluído"},
    ]

@router.get("/{id}")
def buscar_projeto(id: int):
    return {"id": id, "titulo": "Sistema de Reconhecimento Facial", "status": "Em andamento"}

@router.post("/")
def criar_projeto(dados: dict):
    return {"mensagem": "Projeto criado com sucesso", "dados": dados}

@router.put("/{id}")
def atualizar_projeto(id: int, dados: dict):
    return {"mensagem": f"Projeto {id} atualizado com sucesso", "dados": dados}

@router.delete("/{id}")
def deletar_projeto(id: int):
    return {"mensagem": f"Projeto {id} deletado com sucesso"}