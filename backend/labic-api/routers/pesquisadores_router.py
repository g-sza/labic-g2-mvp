from fastapi import APIRouter

router = APIRouter(prefix="/pesquisadores", tags=["Pesquisadores"])

@router.get("/")
def listar_pesquisadores():
    return [
        {"id": 1, "nome": "João Silva", "area": "Inteligência Artificial"},
        {"id": 2, "nome": "Maria Souza", "area": "Banco de Dados"},
    ]

@router.get("/{id}")
def buscar_pesquisador(id: int):
    return {"id": id, "nome": "João Silva", "area": "Inteligência Artificial"}

@router.post("/")
def criar_pesquisador(dados: dict):
    return {"mensagem": "Pesquisador criado com sucesso", "dados": dados}

@router.put("/{id}")
def atualizar_pesquisador(id: int, dados: dict):
    return {"mensagem": f"Pesquisador {id} atualizado com sucesso", "dados": dados}

@router.delete("/{id}")
def deletar_pesquisador(id: int):
    return {"mensagem": f"Pesquisador {id} deletado com sucesso"}