import os
from database import SessionLocal
from models.pesquisadores import PesquisadorModel
from core.security import gerar_hash_senha
from core.logger import logger

def criar_primeiro_admin():
    db = SessionLocal()
    
    try:        
        admin_existente = db.query(PesquisadorModel).filter(PesquisadorModel.is_admin == True).first()
        
        if admin_existente:
            logger.info(f"Administrador já cadastrado: {admin_existente.email}")
            return

        email_admin = os.getenv("ADMIN_EMAIL", "admin@labic.com")
        senha_admin = os.getenv("ADMIN_PASSWORD", "123456")
        
        novo_admin = PesquisadorModel(
            nome="Administrador LABIC",
            email=email_admin,
            senha_hash=gerar_hash_senha(senha_admin),
            titulacao="Admin",
            tipo_vinculo="Gestão",
            instituicao="LABIC",
            is_admin=True
        )

        db.add(novo_admin)
        db.commit()
        db.refresh(novo_admin)
        
        logger.info(f"Primeiro administrador criado com sucesso: {email_admin}")

    except Exception as e:
        logger.error(f"Erro ao criar administrador: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    criar_primeiro_admin()