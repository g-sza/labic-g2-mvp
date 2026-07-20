from datetime import date
from typing import Optional
from pydantic import BaseModel, ConfigDict, model_validator
from models.artigos import StatusArtigo

# Classe base que será usado em outras classes
class ArtigoBase(BaseModel):
    titulo: str
    resumo: Optional[str] = None
    metodologia: Optional[str] = None
    revisao_bibliografica: Optional[str] = None
    arquivos_url: Optional[str] = None
    data_publicacao: Optional[date] = None
    status: StatusArtigo = StatusArtigo.ANDAMENTO

    # Validação condicional baseada no status
    @model_validator(mode='after')
    def validar_campos_por_status(self):
        
        # Regra para artigos fora do Rascunho
        if self.status != StatusArtigo.RASCUNHO:
            erros_base = []
            if not self.resumo:
                erros_base.append("resumo")
            if not self.metodologia:
                erros_base.append("metodologia")
            if not self.revisao_bibliografica:
                erros_base.append("revisão bibliográfica")
                
            if erros_base:
                campos = ", ".join(erros_base)
                raise ValueError(f"Os campos {campos} são obrigatórios para artigos em andamento ou publicados.")

        # Regra exclusiva para artigos Publicados
        if self.status == StatusArtigo.PUBLICADO:
            erros_publicacao = []
            if not self.data_publicacao:
                erros_publicacao.append("data de publicação")
            if not self.arquivos_url:
                erros_publicacao.append("URL do arquivo")
                
            if erros_publicacao:
                campos = " e ".join(erros_publicacao)
                raise ValueError(f"Os campos {campos} são obrigatórios quando o artigo está com status 'Publicado'.")
                
        return self

# Schema de Criação
class ArtigoCreate(ArtigoBase):
    pass

# Schema de Atualização
class ArtigoUpdate(BaseModel):
    titulo: Optional[str] = None
    resumo: Optional[str] = None
    metodologia: Optional[str] = None
    revisao_bibliografica: Optional[str] = None
    arquivos_url: Optional[str] = None
    data_publicacao: Optional[date] = None
    status: Optional[StatusArtigo] = None

# schema de resposta para associação
class PesquisadorArtigoResponse(BaseModel):
    id_pesquisador: int
    is_autor_publicante: bool

    model_config = ConfigDict(from_attributes=True)

# Schema de Resposta
class ArtigoResponse(ArtigoBase):
    id_artigo: int
    pesquisadores_associacao: list[PesquisadorArtigoResponse] = []

    model_config = ConfigDict(from_attributes=True)