from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from crud import crud_projetos
from schemas.projetos_schema import ProjetoCreate, ProjetoUpdate, ProjetoResponse
from core.security import verificar_permissao_admin

router = APIRouter(prefix="/projetos", tags=["Projetos"])

@router.get("/", response_model=list[ProjetoResponse])
def listar_projetos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_projetos.get_projetos(db=db, skip=skip, limit=limit)

@router.get("/{id}", response_model=ProjetoResponse)
def buscar_projeto(id: int, db: Session = Depends(get_db)):
    db_projeto = crud_projetos.get_projeto(db=db, projeto_id=id)
    if db_projeto is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Projeto não encontrado")
    return db_projeto

@router.post("/", response_model=ProjetoResponse, status_code=status.HTTP_201_CREATED)
def criar_projeto(projeto: ProjetoCreate, db: Session = Depends(get_db), admin=Depends(verificar_permissao_admin)):
    return crud_projetos.create_projeto(db=db, projeto=projeto)

@router.put("/{id}", response_model=ProjetoResponse)
def atualizar_projeto(id: int, projeto_atualizado: ProjetoUpdate, db: Session = Depends(get_db), admin=Depends(verificar_permissao_admin)):
    db_projeto = crud_projetos.get_projeto(db=db, projeto_id=id)
    if db_projeto is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Projeto não encontrado")
    return crud_projetos.update_projeto(db=db, db_projeto=db_projeto, projeto_atualizado=projeto_atualizado)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_projeto(id: int, db: Session = Depends(get_db), admin=Depends(verificar_permissao_admin)):
    db_projeto = crud_projetos.get_projeto(db=db, projeto_id=id)
    if db_projeto is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Projeto não encontrado")
    crud_projetos.delete_projeto(db=db, db_projeto=db_projeto)
    return {"mensagem": f"Projeto {id} deletado com sucesso"}

@router.post("/{id_projeto}/pesquisadores/{id_pesquisador}")
def associar_pesquisador_ao_projeto(
    id_projeto: int, 
    id_pesquisador: int, 
    papel: str = "Participante", 
    db: Session = Depends(get_db),
    admin=Depends(verificar_permissao_admin)
):
    nova_associacao = crud_projetos.adicionar_pesquisador_projeto(
        db=db, 
        id_projeto=id_projeto, 
        id_pesquisador=id_pesquisador, 
        papel=papel
    )
    return {
        "mensagem": f"Pesquisador associado como {papel} com sucesso!",
        "dados": {
            "id_projeto": nova_associacao.id_projeto,
            "id_pesquisador": nova_associacao.id_pesquisador,
            "papel": nova_associacao.papel
        }
    }

@router.delete("/{id_projeto}/pesquisadores/{id_pesquisador}")
def desassociar_pesquisador_do_projeto(
    id_projeto: int, 
    id_pesquisador: int, 
    db: Session = Depends(get_db),
    admin=Depends(verificar_permissao_admin)
):
    sucesso = crud_projetos.remover_pesquisador_projeto(
        db=db, 
        id_projeto=id_projeto, 
        id_pesquisador=id_pesquisador
    )
    if not sucesso:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Associação não encontrada.")
    return {"mensagem": "Pesquisador removido do projeto com sucesso!"}