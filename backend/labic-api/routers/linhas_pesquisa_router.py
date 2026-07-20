from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from crud import crud_linhas_pesquisa
from schemas.linhas_pesquisa_schema import LinhasPesquisaCreate, LinhasPesquisaUpdate, LinhasPesquisaResponse

router = APIRouter(prefix="/linhas-pesquisa", tags=["Linhas de Pesquisa"])

@router.get("/", response_model=list[LinhasPesquisaResponse])
def listar_linhas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_linhas_pesquisa.get_linhas(db=db, skip=skip, limit=limit)

@router.get("/{id}", response_model=LinhasPesquisaResponse)
def buscar_linha(id: int, db: Session = Depends(get_db)):
    db_linha = crud_linhas_pesquisa.get_linha(db=db, linha_id=id)
    if db_linha is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Linha de pesquisa não encontrada")
    return db_linha

@router.post("/", response_model=LinhasPesquisaResponse, status_code=status.HTTP_201_CREATED)
def criar_linha(linha: LinhasPesquisaCreate, db: Session = Depends(get_db)):
    return crud_linhas_pesquisa.create_linha(db=db, linha=linha)

@router.put("/{id}", response_model=LinhasPesquisaResponse)
def atualizar_linha(id: int, linha_atualizada: LinhasPesquisaUpdate, db: Session = Depends(get_db)):
    db_linha = crud_linhas_pesquisa.get_linha(db=db, linha_id=id)
    if db_linha is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Linha de pesquisa não encontrada")
    return crud_linhas_pesquisa.update_linha(db=db, db_linha=db_linha, linha_atualizada=linha_atualizada)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_linha(id: int, db: Session = Depends(get_db)):
    db_linha = crud_linhas_pesquisa.get_linha(db=db, linha_id=id)
    if db_linha is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Linha de pesquisa não encontrada")
    crud_linhas_pesquisa.delete_linha(db=db, db_linha=db_linha)
    return {"mensagem": f"Linha de pesquisa {id} deletada com sucesso"}