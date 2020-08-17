API de dados geográficos da São Paulo Urbanismo


#### Pré-requisitos
 - Postgres
 - Nodejs


#### Setup

1. Instale as dependências. No teminal:
```
npm i
```

2. A partir do arquivo `env.sample` crie o arquivo `.env` com as suas variáveis de ambiente
```
DB_HOST=127.0.0.1
DB_USER=postgres
DB_PASS=postgres
DB_NAME=spurb_geo
DB_PORT=5432
```

3. Rode o comado para criar o banco
```
npm run db:create
```

4. Pelo pg admin instale o POSTGIS rodando a seguinte query. No pgadmin:
```
CREATE EXTENSION IF NOT EXISTS postgis;
```
![add-postgis](https://user-images.githubusercontent.com/4117768/90423536-07915200-e093-11ea-9e8f-bd669ecb1b32.png)


5. Crie a estrutura do banco de dados e inclua no banco os dados de `data/oucfl.geojson`:
```
npm run db:init
```

6. Teste se os dados foram corretamente inputados no banco
```
select * from public."Geo";
```
![pgadmin](https://user-images.githubusercontent.com/4117768/90301609-61b5cb80-de77-11ea-9940-3e899780a9de.png)


#### Desenvolvimento
```
npm run dev
```
Teste as enpoints:
 - [http://localhost:5000/geo/api/743](http://localhost:5000/geo/api/743)
 - [http://localhost:5000/geo/api/[743,742,795]/mapear/](http://localhost:5000/geo/api/[743,742,795]/mapear/)


#### Publicação
```
npm run start
```
