# Italo Sergio - API Reddit - Desafio Backend Arrow Digital

Este projeto é um serviço que captura e armazena posts do Reddit e possibilita através de pesquisa por api, filtrar os dados de acordo com numero de comentários ou ups do post.

## Pré-requisitos

Antes de executar o projeto, verifique se você tem os seguintes itens instalados:

- [Docker](https://www.docker.com/) + Docker Compose

## Instalação

1. Clone o repositório `git clone https://github.com/italosergio/backend-challenge.git`
2. Entre no repositório clonado `cd backend-challenge`
3. Crie `.env`.
   * no projeto já existem dois modelos para criação das variáveis de ambiente, então podemos só renomea-los:

   `mv .env-development-exemple .env`
   
   ou
   
   `mv .env-production-exemple .env`


  obs.: aqui existem dois tipos de .env já preparados para melhor noção de como uso dotenv em produção e em desenvolvimento. A grande diferença, além das credenciais de db de cada modelo, é que no arquivo sec/index.ts é usada a variável de ambiente NODE_ENV para definir o uso da _função de agendamento de busca de posts_ uma vez por dia (PRODUÇÂO) e realiza busca instantaneamente para efeito de desenvolvimento e checkagem dos dados instantaneamente, sem ter que esperar pela busca programada, facilitando a vida do avaliador do desafio.

## Execução

`sudo docker-compose build --no-cache`

`sudo docker-compose up -d`

Algo parecido com isto deve aparecer:

```

[+] Running 4/4
 ✔ Network backend-challenge_mongodb_network  Created        0.2s 
 ✔ Volume "backend-challenge_mongo_data"      Created        0.0s 
 ✔ Container mongodb                          Healthy       11.2s 
 ✔ Container italosergio_app_reddit_api       Started       11.5s 

```

extra.: `sudo docker logs -f italosergio_app_reddit_api` - para acompanhar avisos/mensagens de log importantes do servidor, exemplo:

```

$ sudo docker logs italosergio_app_reddit_api

> italosergio-desafio-backend-arrow-digital@1.0.0 start
> npm run build && node dist/src/index.js


> italosergio-desafio-backend-arrow-digital@1.0.0 build
> tsc

Servidor rodando em modo PRODUÇÃO
Servidor rodando na porta 3000
Conectado ao MongoDB com sucesso!
Dados do Banco 'Posts' resetados!
Posts hot do Reddit, salvos com sucesso!
Próxima requisição de Posts HOT do Reddit agendada para às 12 horas


```


## Parar Aplicação

`sudo docker-compose down --volumes --remove-orphans`

## Testes
***a versao node utilizada pra esse projeto é a JOD ou v22.11.0

`npm i`

`npm test`

## Lint 
***a versao node utilizada pra esse projeto é a JOD ou v22.11.0

`npm i`

`npm run lint`


# DUCOMENTAÇÃO DA API
A API expõe os seguintes endpoints:

1. Obter Posts

Método: GET
URL: `/posts`

Query Parameters:


`start` (string): Data de início no formato ISO.

`end` (string): Data de término no formato ISO.


EX.: `http://localhost:3000/posts?start=2024-09-01T00:00:00.000Z&end=2024-12-31T00:00:00.000Z`

***certifique-se de colocar a data desejada correta

Resposta de Sucesso
Código: `200 OK`
Body:

```
[
  {
    "id": "post_id",
    "title": "Título do post",
    "created_utc": "2024-01-01T00:00:00Z",
    ...
  }
]
```


Resposta de Erro
Código: 400 Bad Request
Body:

```
{
  "error": "Parâmetros 'start' e 'end' são obrigatórios."
}
```

2. Obter Posts Ordenados

Método: GET
URL: `/posts/sorted`

Query Parameters:


```start``` (string): Data de início no formato ISO.

```end``` (string): Data de término no formato ISO.

```order``` (string): Campo de ordenação. Pode ser 'ups' ou 'num_comments'.


EX.: `http://localhost:3000/posts/sorted?start=2024-09-01T00:00:00.000Z&end=2024-11-01T00:00:00.000Z&order=num_comments`


Resposta de Sucesso
Código: 200 OK
Body:

```

[
  {
    "id": "post_id",
    "title": "Título do post",
    "created_utc": "2024-01-01T00:00:00Z",
    ...
  }
]

```


Resposta de Erro
Código: 400 Bad Request
Body:
```

{
  "error": "Parâmetros 'start', 'end' e 'order' são obrigatórios."
}

```


ou

```

{
  "error": "Parâmetro de ordenação deve ser 'ups' ou 'num_comments'."
}

```

# Mais Sobre

A aplicação tem um toque especial de controle, que através de uma variável de ambiente podemos modificar o horário da requisição diária dos nossos hot posts do Reddit. Vejamos como funciona:

O código garante que ao iniciar a aplicação, será feita uma requisição imediatamente e, em seguida, a cada dia na hora marcada.

Veja esse trecho em `src/services/cronJob.ts`:

```
async function startCronJob(): Promise<void> {
  await fetchAndSaveHotPosts()
  const time = process.env.TIME_TO_REQUEST_REDDIT || "7"
  cron.schedule(`0 ${time} * * *`, async () => {
    await fetchAndSaveHotPosts();
  });
  console.log(`Próxima requisição de Posts HOT do Reddit agendada para às ${time} horas`)
}

```

Chamada imediata: A função fetchAndSaveHotPosts() é chamada logo no início da função startCronJob(), o que significa que a primeira requisição para buscar e salvar os posts quentes do Reddit será feita assim que a aplicação iniciar.

Agendamento com cron: A linha `cron.schedule(\0 ${time} * * *, async () => {...}` agenda a execução da função `fetchAndSaveHotPosts()` para ser chamada uma vez por dia, na hora especificada pela variável TIME_TO_REQUEST_REDDIT. O formato `0 ${time} * * *` significa que o cron job será executado no minuto zero da hora definida.

Mensagens de log: A linha console.log(...) informa no console quando a próxima requisição está agendada, facilitando o acompanhamento.

### Uso de Healthcheck no Docker Compose
O arquivo `docker-compose.yml` apresentado inclui uma configuração de healthcheck para o serviço MongoDB. Essa configuração é essencial para garantir a resiliência e a disponibilidade da aplicação. O healthcheck permite que o Docker monitore o estado de saúde do serviço, assegurando que ele esteja operacional antes que outros serviços que dependem dele sejam iniciados.

#### Detalhes da Configuração
Teste de Ping: O comando utilizado para o healthcheck é mongo --eval "db.adminCommand('ping')". Este comando verifica a conexão com o banco de dados, retornando um sinal de que o MongoDB está acessível.

*Intervalo e Tempo de Espera:* A configuração interval 10s especifica que o Docker executará o teste a   cada 10 segundos. O timeout 5s define que o teste deve falhar se não receber uma resposta em 5 segundos.
*Retentativas:* Com retries: 5, o Docker tentará 5 vezes verificar a saúde do serviço antes de considerar que ele está com problemas.
*Período de Início*: O start_period 30s indica que o Docker deve aguardar 30 segundos após o início do container antes de iniciar as verificações de saúde. Isso é útil para permitir que o MongoDB complete sua inicialização.

#### Segurança na Criação do Arquivo
Ao criar o arquivo `docker-compose.yml`, é fundamental considerar práticas de segurança para proteger as informações sensíveis e garantir a integridade da aplicação:

*Variáveis de Ambiente*: O uso de variáveis de ambiente para credenciais do MongoDB (como MONGO_INITDB_ROOT_USERNAME e MONGO_INITDB_ROOT_PASSWORD) é uma prática recomendada. Isso evita a exposição direta das credenciais no código. As variáveis devem ser armazenadas em um arquivo .env, que não deve ser versionado no controle de versão (como o Git).

*Controle de Acesso*: É crucial limitar o acesso ao arquivo `docker-compose.yml` e ao arquivo .env apenas aos desenvolvedores que precisam dele. O uso de permissões de arquivo apropriadas ajuda a proteger esses arquivos de acessos não autorizados.

*Atualizações e Manutenção*: Manter as imagens de contêiner e dependências atualizadas é vital para a segurança. O serviço MongoDB deve ser monitorado para novas versões que possam corrigir vulnerabilidades.

*Rede Isolada*: A configuração de uma rede dedicada (mongodb_network) ajuda a isolar os serviços, reduzindo a superfície de ataque. Isso limita a comunicação apenas aos serviços que realmente precisam se comunicar.

*Monitoramento e Logs*: Implementar monitoramento e logging adequados para acompanhar a atividade dos serviços pode ajudar a identificar e responder rapidamente a quaisquer anomalias ou tentativas de acesso não autorizado.
