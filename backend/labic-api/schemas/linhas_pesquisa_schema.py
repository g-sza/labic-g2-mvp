from typing import Optional
from pydantic import BaseModel, ConfigDict

# Classe base que será usado em outras classes
class LinhasPesquisaBase(BaseModel):
    # atributos
    nome: str
    descricao: str

# Schema de Criação
class LinhasPesquisaCreate(LinhasPesquisaBase):
    pass

# Schema de Atualização
class LinhasPesquisaUpdate(BaseModel):

    nome: Optional[str] = None
    descricao: Optional[str] = None

# Schema de Resposta
class LinhasPesquisaResponse(LinhasPesquisaBase):
    
    id_linha: int

    model_config = ConfigDict(from_attributes=True)

