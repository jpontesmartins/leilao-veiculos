leilao-veiculos
===

## Passo a passo

### Backend

http://localhost:9090/api  

1. Instalação
```bash
$ npm install
```

2. Criação da base MongoDB (usando docker-compose) e seed da base
- Criar arquivo .env com os dados do banco:
```bash
DATABASE_URL="mongodb://admin:123456@localhost:27014/leilao-veiculos?authSource=admin&directConnection=true&retryWrites=true&w=majority"
```

```bash
$ docker-compose up
$ npx prisma generate
$ npx prisma db push
$ npx prisma db seed
```

3. 
- Iniciar o projeto localmente em ambiente de desenvolvimento
```bash
$ npm run start:dev
```

4. Testes

```bash
$ npm run test
```

### Frontend

http://localhost:3000/  
http://localhost:3000/leilao

1. Instalacao
```bash
npm install
```

2. Rodar localmente em ambiente de desenvolvimento

```bash
npm run dev
```