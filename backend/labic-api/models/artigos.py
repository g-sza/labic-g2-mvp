import enum
from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
from database import Base
from models.associacoes import projeto_artigo

class StatusArtigo(str, enum.Enum):
    #Opções de Status
    RASCUNHO = "Rascunho"
    ANDAMENTO = "Em Andamento"
    PUBLICADO = "Publicado"



class ArtigoModel(Base):
    __tablename__ = "artigos"
    
    # atributos
    id_artigo = Column(Integer, primary_key=True, index=True, autoincrement=True)
    titulo = Column(String(150), nullable=False, index=True, unique=True)
    resumo = Column(Text, nullable=True)
    metodologia = Column(Text, nullable=True)
    revisao_bibliografica = Column(Text, nullable=True)
    arquivos_url = Column(String(1024), nullable=True)
    data_publicacao = Column(Date, nullable=True)
    status = Column(Enum(StatusArtigo), default= StatusArtigo.ANDAMENTO, nullable=False)

    # chave estrangeira
    linha_pesquisa_id = Column(Integer, ForeignKey("linhas_pesquisa.id_linha"))

    # relacionamentos da tabela
    linha_pesquisa = relationship("LinhaPesquisaModel", back_populates="artigos")
    projetos = relationship("ProjetoModel", secondary=projeto_artigo, back_populates="artigos")
    pesquisadores_associacao = relationship("PesquisadorArtigoModel", back_populates="artigo")