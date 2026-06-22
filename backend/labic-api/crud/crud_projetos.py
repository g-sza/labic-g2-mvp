from sqlalchemy.orm import Session
import models, schemas

def get_projeto(db: Session, projeto_id: int):
    return db.query(models.ProjetoModel).filter(models.ProjetoModel.id_projeto == projeto_id).first()

def get_projetos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ProjetoModel).offset(skip).limit(limit).all()

def create_projeto(db: Session, projeto: schemas.ProjetoCreate):
    db_projeto = models.ProjetoModel(**projeto.model_dump())
    db.add(db_projeto)
    db.commit()
    db.refresh(db_projeto)
    return db_projeto

def update_projeto(db: Session, db_projeto: models.ProjetoModel, projeto_atualizado: schemas.ProjetoCreate):
    for key, value in projeto_atualizado.model_dump().items():
        setattr(db_projeto, key, value)
    db.commit()
    db.refresh(db_projeto)
    return db_projeto

def delete_projeto(db: Session, db_projeto: models.ProjetoModel):
    db.delete(db_projeto)
    db.commit()
    return True