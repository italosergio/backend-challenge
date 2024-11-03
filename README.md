# Italo Sergio - API Reddit - Desafio Backend Arrow Digital

Este projeto é um serviço que captura e armazena posts do Reddit e possibilita através de pesquisa por api, filtrar os dados de acordo com numero de comentários ou ups do post.

## Pré-requisitos

Antes de executar o projeto, verifique se você tem os seguintes itens instalados:

- [Docker](https://www.docker.com/) + Docker Compose

## Instalação

1. Clone o repositório `git clone https://github.com/italosergio/backend-challenge.git`
2. Entre no repositório clonado `cd backend-challenge`
4. Renomeie o arquivo `.env-exemple` para `.env`. (Podemos usar `mv .env-exemple .env`)

## Execução

`sudo docker-compose up -d`

## Parar Aplicação

`sudo docker-compose down`

## Testes

`npm test`

## Lint 

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
