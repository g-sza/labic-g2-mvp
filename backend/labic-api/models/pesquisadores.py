from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from database import Base

class PesquisadorModel(Base):
    __tablename__ = "pesquisadores"

    # atributos
    id_pesquisador = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(150), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    senha_hash = Column(String(255), nullable=False)
    titulacao = Column(String(100), nullable=True)
    tipo_vinculo = Column(String(100), nullable=True)
    instituicao = Column(String(150), nullable=True)
    is_admin = Column(Boolean, default=False)

    # relacionamentos
    artigos_associacao = relationship("PesquisadorArtigoModel", back_populates="pesquisador")
    projetos_associacao = relationship("PesquisadorProjetoModel", back_populates="pesquisador")