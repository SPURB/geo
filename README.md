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
npx sequelize-cli db:create
```

4. Pelo pg admin instale o POSTGIS rodando a seguinte query. No pgadmin:
```
CREATE EXTENSION IF NOT EXISTS postgis;
```

5. Crie a estrutura do banco de dados. No terminal:
```
npx sequelize-cli db:migrate
```

6. Popule o banco com os dados de `data/oucfl.geojson`
```
npx sequelize-cli db:seed:all
```

7. Teste no pg admin se está tudo certo. No pgadmin:
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
