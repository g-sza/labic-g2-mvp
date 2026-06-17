from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.artigos_schema import ArtigoCreate, ArtigoResponse
from crud import crud_artigos
from database import get_db

router = APIRouter(prefix="/artigos", tags=["Artigos"])

@router.get("/", response_model=list[ArtigoResponse])
def listar_artigos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_artigos.get_artigos(db=db, skip=skip, limit= limit)

@router.get("/{artigo_id}", response_model=ArtigoResponse)
def buscar_artigo(artigo_id: int, db: Session = Depends(get_db)):
    db_artigo = crud_artigos.get_artigo(db=db, artigo_id=artigo_id)
    if db_artigo is None:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")
    return db_artigo

@router.post("/",response_model=ArtigoResponse)
def criar_artigo(artigo:ArtigoCreate, db: Session = Depends(get_db)):
    return crud_artigos.create_artigo(db=db, artigo=artigo)

@router.put("/{artigo_id}", response_model=ArtigoResponse)
def atualizar_artigo(artigo_id: int, artigo_atualizado: ArtigoCreate, db: Session = Depends(get_db)):
    db_artigo = crud_artigos.get_artigo(db=db, artigo_id=artigo_id)
    if db_artigo is None:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")
    return crud_artigos.update_artigo(db=db, db_artigo=db_artigo, artigo_updated=artigo_atualizado)

@router.delete("/{artigo_id}")
def deletar_artigo(artigo_id: int, db: Session = Depends(get_db)):
    db_artigo = crud_artigos.get_artigo(db=db, artigo_id=artigo_id)
    if db_artigo is None:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")
    crud_artigos.delete_artigo(db=db, db_artigo=db_artigo)
    return {"mensagem": f"Artigo {artigo_id} deletado com sucesso"}