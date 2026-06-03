from datetime import date
from typing import Optional
from pydantic import BaseModel, ConfigDict

#Classe base que será usado em outras classes
class ProjetoBase(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    data_inicio: date
    data_fim: Optional[date] = None
    status: str

#Schema de Criação
class ProjetoCreate(ProjetoBase):
    pass

#Schema de Atualização
class ProjetoUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    data_inicio: Optional[date] = None
    data_fim: Optional[date] = None
    status: Optional[date] = None

#Schema de Resposta
class ProjetoResponse(ProjetoBase):
    id_projeto: int

    model_config = ConfigDict(from_attributes=True)


