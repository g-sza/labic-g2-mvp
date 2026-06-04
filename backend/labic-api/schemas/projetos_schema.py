from datetime import date
from typing import Optional
from pydantic import BaseModel, ConfigDict
from models.projetos import StatusProjeto


#Classe base que será usado em outras classes
class ProjetoBase(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    data_inicio: Optional[date] = None
    data_fim: Optional[date] = None
    status: StatusProjeto = StatusProjeto.PLANEJAMENTO

#Schema de Criação
class ProjetoCreate(ProjetoBase):
    pass

#Schema de Atualização
class ProjetoUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    data_inicio: Optional[date] = None
    data_fim: Optional[date] = None
    status: Optional[StatusProjeto] = None

#Schema de Resposta
class ProjetoResponse(ProjetoBase):
    id_projeto: int

    model_config = ConfigDict(from_attributes=True)


