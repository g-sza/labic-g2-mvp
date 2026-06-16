from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship
from database import Base

# tabela sem atributos extras
projeto_artigo = Table(
    "projetos_artigos",
    Base.metadata,
    Column("id_projeto", Integer, ForeignKey("projetos.id_projeto", ondelete="CASCADE"), primary_key=True),
    Column("id_artigo", Integer, ForeignKey("artigos.id_artigo", ondelete="CASCADE"), primary_key=True),
)

# tabelas com atributos de relacionamento
class PesquisadorArtigoModel(Base):
    __tablename__ = "pesquisadores_artigos"

    # atributos
    id_pesquisador = Column(Integer, ForeignKey("pesquisadores.id_pesquisador", ondelete="CASCADE"), primary_key=True)
    id_artigo = Column(Integer, ForeignKey("artigos.id_artigo", ondelete="CASCADE"), primary_key=True)
    is_autor_publicante = Column(Boolean, nullable=False, default=False)

    # relacionamentos
    pesquisador = relationship("PesquisadorModel", back_populates="artigos_associacao")
    artigo = relationship("ArtigoModel", back_populates="pesquisadores_associacao")

class PesquisadorProjetoModel(Base):
    __tablename__ = "pesquisadores_projetos"

    # atributos
    id_pesquisador = Column(Integer, ForeignKey("pesquisadores.id_pesquisador", ondelete="CASCADE"), primary_key=True)
    id_projeto = Column(Integer, ForeignKey("projetos.id_projeto", ondelete="CASCADE"), primary_key=True)
    papel = Column(String(50), nullable=False, default="Participante")

    # relacionamentos
    pesquisador = relationship("PesquisadorModel", back_populates="projetos_associacao")
    projeto = relationship("ProjetoModel", back_populates="pesquisadores_associacao")