from sqlalchemy.orm import Session
import models, schemas

def get_pesquisador(db: Session, pesquisador_id: int):
    return db.query(models.PesquisadorModel).filter(models.PesquisadorModel.id_pesquisador == pesquisador_id).first()

def get_pesquisadores(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.PesquisadorModel).offset(skip).limit(limit).all()

def create_pesquisador(db: Session, pesquisador: schemas.PesquisadoresCreate):
    db_pesquisador = models.PesquisadorModel(**pesquisador.model_dump())
    db.add(db_pesquisador)
    db.commit()
    db.refresh(db_pesquisador)
    return db_pesquisador

def update_pesquisador(db: Session, db_pesquisador: models.PesquisadorModel, pesquisador_atualizado: schemas.PesquisadoresUpdate):
    for key, value in pesquisador_atualizado.model_dump().items():
        setattr(db_pesquisador,key, value)
    db.commit()
    db.refresh(db_pesquisador)
    return db_pesquisador
    
def delete_pesquisador(db: Session, db_pesquisador: models.PesquisadorModel):
    db.delete(db_pesquisador)
    db.commit()
    return True