(em desenvolvimento) API de dados geográficos da São Paulo Urbanismo


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

3. Pelo pg admin instale o POSTGIS rodando a seguinte query. No pgadmin:
```
CREATE EXTENSION IF NOT EXISTS postgis;
```
![add-postgis](https://user-images.githubusercontent.com/4117768/90423536-07915200-e093-11ea-9e8f-bd669ecb1b32.png)


4. Rode o comado para criar o banco
```
npm run db:create
```

5. Crie a estrutura do banco de dados e inclua no banco os dados de `data/oucfl.geojson`:
```
npm run db:init
```

6. Teste se os dados foram corretamente inputados no banco
![pgadmin](https://user-images.githubusercontent.com/4117768/90301609-61b5cb80-de77-11ea-9940-3e899780a9de.png)
```sql
SELECT * from public."Geos"; -- "Mapas", "MapaGeos" e "Tokens"
```

7. Teste as enpoints exemplificadas na raiz:
 - `npm run start`
 - [http://localhost:5000/geo/api/]


#### Desenvolvimento
```
npm run dev
```

#### Publicação
```
npm run start
```
