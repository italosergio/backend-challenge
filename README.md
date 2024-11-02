# Nome do Projeto

Uma breve descrição do projeto. Este projeto é um serviço que captura e armazena posts do Reddit.

## Pré-requisitos

Antes de executar o projeto, verifique se você tem os seguintes itens instalados:

- [Docker](https://www.docker.com/) + Docker Compose

## Instalação

1. Clone o repositório `git clone https://github.com/arrow-digital/backend-challenger.git`
2. Entre no repositório clonado `cd backend-challenger`
3. Instale as dependências `npm i`
4. Renomeie o arquivo `.env-exemple` para `.env`

## Execução

`sudo docker-compose up -d`

## Parar

`sudo docker-compose down`

# DUCOMENTAÇÃO DA API
A API expõe os seguintes endpoints:

1. Obter Posts

Método: GET
URL: /posts

Query Parameters:
`start` (string): Data de início no formato ISO.
`end` (string): Data de término no formato ISO.

EX.: `http://localhost:3000/posts?start=2024-09-01T00:00:00.000Z&end=2024-11-01T00:00:00.000Z`


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
URL: /posts/sorted

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
