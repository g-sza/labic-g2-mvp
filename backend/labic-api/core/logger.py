import logging
import os
import sys
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

# salva no arquivo local
arquivo_handler = RotatingFileHandler(
    filename="api_labic.log", 
    maxBytes=5000000, 
    backupCount=3,
    encoding="utf-8"
)
arquivo_handler.setFormatter(formatacao)
logger.addHandler(arquivo_handler)

# imprime no terminal apenas se estiver em Nuvem
ambiente = os.getenv("AMBIENTE", "desenvolvimento")

if ambiente == "producao":
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatacao)
    logger.addHandler(console_handler)