# Desafio back end - Arrow Digital

## Tecnologias

É obrigatório o uso das tecnologias abaixo:

-   Node.js.
- TypeScript.
-   Express. (ou qualquer outra biblioteca de roteamento de sua preferência)
-   MongoDB.
-   Mongoose.

## Desafio técnico

O desafio consiste em criar um programa que consulte a API do [Reddit](https://www.reddit.com/dev/api/) uma vez por dia (deve ser uma tarefa agendada para rodar em um horário específico que você definir).

A sua tarefa diária deve salvar, em um banco de dados, as postagens que estejam HOT do subreddit [artificial](https://api.reddit.com/r/artificial/hot).

Você deve salvar o título da postagem, nome do autor, timestamp da criação da postagem, número de ups e número de comentários, e criar dois endpoints para consulta desses dados (endpoints REST).

O primeiro endpoint deverá receber dois parâmetros: uma data de início e uma data final. Com base no período passado, o endpoint deve ser capaz de retornar todas as postagens desse período, ordenadas das postagens mais novas para as mais velhas.

**Exemplos de input:** 
- Data de início: `2024-09-01T00:00:00.000Z`
- Data de fim: `2024-09-31T00:00:00.000Z`

O segundo endpoint deverá receber três parâmetros: uma data de início, uma data final e uma ordem. As ordens possíveis de serem passadas são: `ups` ou a `quantidade de comentários`. Com base nos parâmetros, o endpoint deve ser capaz de retornar todas as postagens desse período e ordenar com base no parâmetro passado. A ordenação deve ser decrescente, ou seja, do maior para o menor.

**Exemplos de input:** 
- Data de início: `2024-09-01T00:00:00.000Z`
- Data de fim: `2024-09-31T00:00:00.000`
- Ordem: `comments` ou `ups`

**OBS: Não se esqueça de incluir instruções sobre como executar o seu projeto no `README` do projeto.**

##

**O que vamos avaliar:**

-   **Se atende ao que foi pedido**
-   **Se segue o padrão RESTful**
-   **Arquitetura bem definida**
-   **Legibilidade e organização**
-   **Falhas de segurança**
-   **Tratamento de erros/exceções**
-   **Quantidade de bugs**
- **Seguir o padrão [conventional commits](https://www.conventionalcommits.org/pt-br/v1.0.0/)**
- **Boas práticas**

**Pontos extras:**

-   **Testes unitários**
-   **Testes de integração**
-   **Uso de contêiner (Docker)**
-   **Documentação**
-   **Padrão de código (linter)**
- **Projeto rodando em algum serviço cloud**


**Em caso de dúvidas, entre em contato com a pessoa que te passou este desafio.**

Boa sorte.
