import logging
from logging.handlers import RotatingFileHandler

# traduções dos níveis de alerta
logging.addLevelName(logging.WARNING, "AVISO")
logging.addLevelName(logging.ERROR, "ERRO")
logging.addLevelName(logging.CRITICAL, "CRITICO")

# criando o logger principal da aplicação
logger = logging.getLogger("labic_api")
logger.setLevel(logging.INFO)

# definição do identificador do tipo de mensagem
formatacao = logging.Formatter(
    fmt="%(asctime)s | %(levelname)-8s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

# definição de tamanho máximo por arquivo e quantidade de backups
arquivo_handler = RotatingFileHandler(
    filename="api_labic.log", 
    maxBytes=5000000, 
    backupCount=3,
    encoding="utf-8"
)
arquivo_handler.setFormatter(formatacao)

# adicionando o resultado
logger.addHandler(arquivo_handler)