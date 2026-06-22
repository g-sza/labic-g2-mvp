from sqlalchemy.orm import Session
from schemas.artigos_schema import ArtigoCreate, ArtigoResponse
from models.artigos import ArtigoModel

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

def update_artigo(db: Session, db_artigo: ArtigoModel, artigo_atualizado: ArtigoCreate):
    for key, value in artigo_atualizado.model_dump().items():
        setattr(db_artigo, key, value)
    db.commit()
    db.refresh(db_artigo)
    return db_artigo

def delete_artigo(db: Session, db_artigo: ArtigoModel):
    db.delete(db_artigo)
    db.commit()
    return True