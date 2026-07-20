from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr

class PesquisadoresBase(BaseModel):
    nome: str
    email: EmailStr
    titulacao: Optional[str] = None
    tipo_vinculo: Optional[str] = None
    instituicao: Optional[str] = None
    is_admin: bool = False


class PesquisadoresCreate(PesquisadoresBase):
    senha_hash: str


class PesquisadoresUpdate(BaseModel):
    nome: Optional[str] = None
    email:Optional[EmailStr] = None
    titulacao:Optional[str] = None
    tipo_vinculo: Optional[str] = None
    instituicao:Optional[str] = None
    is_admin: Optional[bool] = None


class PesquisadoresResponse(PesquisadoresBase):
    id_pesquisador: int 

    model_config = ConfigDict(from_attributes=True)