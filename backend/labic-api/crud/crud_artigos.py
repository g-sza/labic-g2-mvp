from sqlalchemy.orm import Session
import models, schemas

def get_artigo(db: Session, artigo_id: int):
    return db.query(models.artigos).filter(models.artigos.id_artigo == artigo_id).first()

def get_artigos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.artigos).offset(skip).limit(limit).all()

def create_artigo(db: Session, artigo: schemas.ArtigoCreate):
    db_artigo = models.artigos(**artigo.model_dump())
    db.add(db_artigo)
    db.commit()
    db.refresh(db_artigo)
    return db_artigo

def update_artigo(db: Session, db_artigo: models.artigos, artigo_atualizado: schemas.ArtigoCreate):
    for key, value in artigo_atualizado.model_dump().items():
        setattr(db_artigo, key, value)
    db.commit()
    db.refresh(db_artigo)
    return db_artigo

def delete_artigo(db: Session, db_artigo: models.artigos):
    db.delete(db_artigo)
    db.commit()
    return True