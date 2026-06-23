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

def update_projeto(db: Session, db_projeto: models.ProjetoModel, projeto_atualizado: schemas.ProjetoUpdate):
    for key, value in projeto_atualizado.model_dump().items():
        setattr(db_projeto, key, value)
    db.commit()
    db.refresh(db_projeto)
    return db_projeto

def delete_projeto(db: Session, db_projeto: models.ProjetoModel):
    db.delete(db_projeto)
    db.commit()
    return True

def adicionar_pesquisador_projeto(db: Session, id_projeto: int, id_pesquisador: int, papel: str = "Participante"):
    nova_associacao = models.PesquisadorProjetoModel(
        id_projeto=id_projeto,
        id_pesquisador=id_pesquisador,
        papel=papel
    )
    db.add(nova_associacao)
    db.commit()
    db.refresh(nova_associacao)
    return nova_associacao

def remover_pesquisador_projeto(db: Session, id_projeto: int, id_pesquisador: int):
    associacao = db.query(models.PesquisadorProjetoModel).filter(
        models.PesquisadorProjetoModel.id_projeto == id_projeto,
        models.PesquisadorProjetoModel.id_pesquisador == id_pesquisador
    ).first()
    
    if associacao:
        db.delete(associacao)
        db.commit()
        return True
    return False