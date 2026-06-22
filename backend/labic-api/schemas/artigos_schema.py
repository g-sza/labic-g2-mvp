from datetime import date
from typing import Optional
from pydantic import BaseModel, ConfigDict
from models.artigos import StatusArtigo


#Classe base que será usado em outras classes
class ArtigoBase(BaseModel):
    titulo: str
    resumo: Optional[str] = None
    metodologia: Optional[str] = None
    revisao_bibliografica: Optional[str] = None
    arquivos_url: Optional[str] = None
    data_publicacao: Optional[date] = None
    status: StatusArtigo = StatusArtigo.ANDAMENTO


#Schema de Criação
class ArtigoCreate(ArtigoBase):
    pass


#Schema de Atualização
class ArtigoUpdate(BaseModel):
    titulo: Optional[str] = None
    resumo: Optional[str] = None
    metodologia: Optional[str] = None
    revisao_bibliografica: Optional[str] = None
    arquivos_url: Optional[str] = None
    data_publicacao: Optional[date] = None
    status: Optional[StatusArtigo] = None


#Schema de Resposta
class ArtigoResponse(ArtigoBase):
    id_artigo: int

    model_config = ConfigDict(from_attributes=True)



