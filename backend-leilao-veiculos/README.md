Backend Leilao Veiclos

## API 

http://localhost:9090/api

## Passo a passo

1. Instalação

```bash
$ npm install
```

2. Criação da base MongoDB (usando docker-compose) e seed da base

Criar arquivo .env com os dados do banco:
```bash
DATABASE_URL="mongodb://admin:123456@localhost:27013/leilao-veiculos?authSource=admin&directConnection=true&retryWrites=true&w=majority"
```

```bash

$ docker-compose up
$ npx prisma generate
$ npx prisma db push
$ npx prisma db seed

```

3. 
```bash
$ npm run start:dev
```

## Testes

```bash
$ npm run test
```
