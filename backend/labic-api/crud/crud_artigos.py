from sqlalchemy.orm import Session
from schemas.artigos_schema import ArtigoCreate, ArtigoUpdate
from models.artigos import ArtigoModel, PesquisadorArtigoModel 

def get_artigo(db: Session, artigo_id: int):
    return db.query(ArtigoModel).filter(ArtigoModel.id_artigo == artigo_id).first()

def get_artigos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(ArtigoModel).offset(skip).limit(limit).all()

def create_artigo(db: Session, artigo: ArtigoCreate):
    db_artigo = ArtigoModel(**artigo.model_dump())
    db.add(db_artigo)
    db.commit()
    db.refresh(db_artigo)
    return db_artigo

def update_artigo(db: Session, db_artigo: ArtigoModel, artigo_atualizado: ArtigoUpdate):
    for key, value in artigo_atualizado.model_dump().items():
        setattr(db_artigo, key, value)
    db.commit()
    db.refresh(db_artigo)
    return db_artigo

def delete_artigo(db: Session, db_artigo: ArtigoModel):
    db.delete(db_artigo)
    db.commit()
    return True

def adicionar_pesquisador_artigo(db: Session, id_artigo: int, id_pesquisador: int, is_autor_publicante: bool = False):
    nova_associacao = PesquisadorArtigoModel(
        id_artigo=id_artigo,
        id_pesquisador=id_pesquisador,
        is_autor_publicante=is_autor_publicante
    )
    db.add(nova_associacao)
    db.commit()
    db.refresh(nova_associacao)
    return nova_associacao

def remover_pesquisador_artigo(db: Session, id_artigo: int, id_pesquisador: int):
    associacao = db.query(PesquisadorArtigoModel).filter(
        PesquisadorArtigoModel.id_artigo == id_artigo,
        PesquisadorArtigoModel.id_pesquisador == id_pesquisador
    ).first()
    
    if associacao:
        db.delete(associacao)
        db.commit()
        return True
    return False