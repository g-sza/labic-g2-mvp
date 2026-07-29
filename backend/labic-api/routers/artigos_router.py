from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.artigos_schema import ArtigoCreate, ArtigoResponse, ArtigoUpdate
from crud import crud_artigos
from database import get_db
from core.security import verificar_permissao_admin

router = APIRouter(prefix="/artigos", tags=["Artigos"])

@router.get("/", response_model=list[ArtigoResponse])
def listar_artigos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_artigos.get_artigos(db=db, skip=skip, limit=limit)

@router.get("/{artigo_id}", response_model=ArtigoResponse)
def buscar_artigo(artigo_id: int, db: Session = Depends(get_db)):
    db_artigo = crud_artigos.get_artigo(db=db, artigo_id=artigo_id)
    if db_artigo is None:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")
    return db_artigo

@router.post("/", response_model=ArtigoResponse, status_code=status.HTTP_201_CREATED)
def criar_artigo(artigo: ArtigoCreate, db: Session = Depends(get_db), admin=Depends(verificar_permissao_admin)):
    return crud_artigos.create_artigo(db=db, artigo=artigo)

@router.post("/{artigo_id}/pesquisadores/{pesquisador_id}")
def associar_pesquisador_ao_artigo(
    artigo_id: int, 
    pesquisador_id: int, 
    is_autor_publicante: bool = False, 
    db: Session = Depends(get_db),
    admin=Depends(verificar_permissao_admin)
):
    nova_associacao = crud_artigos.adicionar_pesquisador_artigo(
        db=db, 
        id_artigo=artigo_id, 
        id_pesquisador=pesquisador_id, 
        is_autor_publicante=is_autor_publicante
    )
    return {
        "mensagem": "Pesquisador associado ao artigo com sucesso!",
        "dados": {
            "id_artigo": nova_associacao.id_artigo,
            "id_pesquisador": nova_associacao.id_pesquisador,
            "is_autor_publicante": nova_associacao.is_autor_publicante
        }
    }

@router.put("/{artigo_id}", response_model=ArtigoResponse)
def atualizar_artigo(artigo_id: int, artigo_atualizado: ArtigoUpdate, db: Session = Depends(get_db), admin=Depends(verificar_permissao_admin)):
    db_artigo = crud_artigos.get_artigo(db=db, artigo_id=artigo_id)
    if db_artigo is None:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")
    return crud_artigos.update_artigo(db=db, db_artigo=db_artigo, artigo_atualizado=artigo_atualizado)

@router.delete("/{artigo_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_artigo(artigo_id: int, db: Session = Depends(get_db), admin=Depends(verificar_permissao_admin)):
    db_artigo = crud_artigos.get_artigo(db=db, artigo_id=artigo_id)
    if db_artigo is None:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")
    crud_artigos.delete_artigo(db=db, db_artigo=db_artigo)
    return {"mensagem": f"Artigo {artigo_id} deletado com sucesso"}

@router.delete("/{artigo_id}/pesquisadores/{pesquisador_id}")
def desassociar_pesquisador_do_artigo(
    artigo_id: int, 
    pesquisador_id: int, 
    db: Session = Depends(get_db),
    admin=Depends(verificar_permissao_admin)
):
    sucesso = crud_artigos.remover_pesquisador_artigo(
        db=db, 
        id_artigo=artigo_id, 
        id_pesquisador=pesquisador_id
    )
    if not sucesso:
        raise HTTPException(status_code=404, detail="Associação não encontrada.")
    return {"mensagem": "Pesquisador removido do artigo com sucesso!"}