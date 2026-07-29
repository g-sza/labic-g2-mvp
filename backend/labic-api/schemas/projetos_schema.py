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
    pesquisador_id: int

#Schema de Atualização
class ProjetoUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    data_inicio: Optional[date] = None
    data_fim: Optional[date] = None
    status: Optional[StatusProjeto] = None

# schema de resposta para associação
class PesquisadorProjetoResponse(BaseModel):
    id_pesquisador: int
    papel: str

    model_config = ConfigDict(from_attributes=True)

#Schema de Resposta
class ProjetoResponse(ProjetoBase):
    id_projeto: int
    pesquisadores_associacao: list[PesquisadorProjetoResponse] = []

    model_config = ConfigDict(from_attributes=True)


