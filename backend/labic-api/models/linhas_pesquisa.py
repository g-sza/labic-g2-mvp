from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from database import Base

class LinhaPesquisaModel(Base):
    __tablename__ = "linhas_pesquisa"
    
    # atributos
    id_linha = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100), nullable=False, index=True, unique=True)
    descricao = Column(Text, nullable=False)

    # relacionamentos
    projetos = relationship("ProjetoModel", back_populates="linha_pesquisa")
    artigos = relationship("ArtigoModel", back_populates="linha_pesquisa")
    