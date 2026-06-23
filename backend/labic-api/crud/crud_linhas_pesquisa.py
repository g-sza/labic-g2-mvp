from sqlalchemy.orm import Session
import models, schemas

def get_linha(db: Session, linha_id: int):
    return db.query(models.LinhaPesquisaModel).filter(models.LinhaPesquisaModel.id_linha == linha_id).first()

def get_linhas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.LinhaPesquisaModel).offset(skip).limit(limit).all()

def create_linha(db: Session, linha: schemas.LinhasPesquisaCreate):
    db_linha = models.LinhaPesquisaModel(**linha.model_dump())
    db.add(db_linha)
    db.commit()
    db.refresh(db_linha)
    return db_linha

def update_linha(db: Session, db_linha: models.LinhaPesquisaModel, linha_atualizada: schemas.LinhasPesquisaUpdate):
    for key, value in linha_atualizada.model_dump().items():
        setattr(db_linha, key, value)
    db.commit()
    db.refresh(db_linha)
    return db_linha

def delete_linha(db: Session, db_linha: models.LinhaPesquisaModel):
    db.delete(db_linha)
    db.commit()
    return True