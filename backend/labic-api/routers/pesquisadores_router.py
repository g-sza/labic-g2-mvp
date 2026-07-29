from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from crud import crud_pesquisadores
from schemas.pesquisadores_schema import PesquisadoresCreate, PesquisadoresUpdate, PesquisadoresResponse
from core.security import gerar_hash_senha, verificar_permissao_admin

router = APIRouter(prefix="/pesquisadores", tags=["Pesquisadores"])

@router.get("/", response_model=list[PesquisadoresResponse])
def listar_pesquisadores(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_pesquisadores.get_pesquisadores(db=db, skip=skip, limit=limit)

@router.get("/{id}", response_model=PesquisadoresResponse)
def buscar_pesquisador(id: int, db: Session = Depends(get_db)):
    db_pesquisador = crud_pesquisadores.get_pesquisador(db=db, pesquisador_id=id)
    if db_pesquisador is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pesquisador não encontrado")
    return db_pesquisador

@router.post("/", response_model=PesquisadoresResponse, status_code=status.HTTP_201_CREATED)
def criar_pesquisador(pesquisador: PesquisadoresCreate, db: Session = Depends(get_db), admin=Depends(verificar_permissao_admin)):
    pesquisador.senha_hash = gerar_hash_senha(pesquisador.senha_hash)
    return crud_pesquisadores.create_pesquisador(db=db, pesquisador=pesquisador)

@router.put("/{id}", response_model=PesquisadoresResponse)
def atualizar_pesquisador(id: int, pesquisador_atualizado: PesquisadoresUpdate, db: Session = Depends(get_db), admin=Depends(verificar_permissao_admin)):
    db_pesquisador = crud_pesquisadores.get_pesquisador(db=db, pesquisador_id=id)
    if db_pesquisador is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pesquisador não encontrado")
    return crud_pesquisadores.update_pesquisador(db=db, db_pesquisador=db_pesquisador, pesquisador_atualizado=pesquisador_atualizado)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_pesquisador(id: int, db: Session = Depends(get_db), admin=Depends(verificar_permissao_admin)):
    db_pesquisador = crud_pesquisadores.get_pesquisador(db=db, pesquisador_id=id)
    if db_pesquisador is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pesquisador não encontrado")
    crud_pesquisadores.delete_pesquisador(db=db, db_pesquisador=db_pesquisador)
    return {"mensagem": f"Pesquisador {id} deletado com sucesso"}