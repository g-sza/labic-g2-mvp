from fastapi import APIRouter

router = APIRouter(prefix="/linhas-pesquisa", tags=["Linhas de Pesquisa"])

@router.get("/")
def listar_linhas():
    return [
        {"id": 1, "nome": "Inteligência Artificial", "descricao": "Pesquisas em IA e ML"},
        {"id": 2, "nome": "Engenharia de Software", "descricao": "Métodos e processos de software"},
    ]

@router.get("/{id}")
def buscar_linha(id: int):
    return {"id": id, "nome": "Inteligência Artificial", "descricao": "Pesquisas em IA e ML"}

@router.post("/")
def criar_linha(dados: dict):
    return {"mensagem": "Linha de pesquisa criada com sucesso", "dados": dados}

@router.put("/{id}")
def atualizar_linha(id: int, dados: dict):
    return {"mensagem": f"Linha de pesquisa {id} atualizada com sucesso", "dados": dados}

@router.delete("/{id}")
def deletar_linha(id: int):
    return {"mensagem": f"Linha de pesquisa {id} deletada com sucesso"}