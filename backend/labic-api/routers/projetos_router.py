from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud import crud_projetos

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

@router.post("/{id_projeto}/pesquisadores/{id_pesquisador}")
def associar_pesquisador_ao_projeto(
    id_projeto: int, 
    id_pesquisador: int, 
    papel: str = "Participante", 
    db: Session = Depends(get_db)
):
    nova_associacao = crud_projetos.adicionar_pesquisador_projeto(
        db=db, 
        id_projeto=id_projeto, 
        id_pesquisador=id_pesquisador, 
        papel=papel
    )
    return {"mensagem": f"Pesquisador associado como {papel} com sucesso!"}

@router.delete("/{id_projeto}/pesquisadores/{id_pesquisador}")
def desassociar_pesquisador_do_projeto(
    id_projeto: int, 
    id_pesquisador: int, 
    db: Session = Depends(get_db)
):
    sucesso = crud_projetos.remover_pesquisador_projeto(
        db=db, 
        id_projeto=id_projeto, 
        id_pesquisador=id_pesquisador
    )
    if not sucesso:
        raise HTTPException(status_code=404, detail="Associação não encontrada.")
    return {"mensagem": "Pesquisador removido do projeto com sucesso!"}