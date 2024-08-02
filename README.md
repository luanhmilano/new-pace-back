# New Pace (Backend)

## Visão Geral

New Pace é um sistema de gerenciamento de audiências e pautas. Ele processa arquivos Excel contendo informações sobre audiências, armazena os dados em um banco de dados PostgreSQL e fornece uma API para acessar e manipular esses dados. Ele também organiza as audiências em pautas, que são conjuntos de audiências em um mesmo dia, turno, órgão julgador e sala, além de retornar um arquivo .xlsx para o frontend com as audiências organizadas.

## Instalação

1. Clone o repositório

```sh
    git clone https://github.com/luanhmilano/new-pace-back.git
```

2. Instale as dependências

```sh
    npm install
```

3. Configure as variáveis de ambiente:

* .env.development (Database de desenvolvimento)
* .env.production (Database do Power BI)
* .env.test (Database de testes)

4. Execute as migrações do Prisma:

```sh
    npm run migrate:dev
```

## Uso

### Desenvolvimento

```sh
    npm run dev
```

### Banco do Power BI

```sh
    npm run prod
```

## Testes

```sh
    npm run test
```