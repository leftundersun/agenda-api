# API Node.js

## Visão geral
Essa API Node é um exemplo

### Rodando pela primeira vez
Para rodar a api pela primeira vez, siga os seguintes passos:
	* crie um banco de dados para essa aplicação
	* crie um arquivo chamado `.env` na raiz do projeto como o exemplo abaixo
		```
		//porta na qual sua API estará visível

		PORT=3001

		//máquina na qual está seu banco de dados

		DB_HOST=localhost

		//usuário a ser utilizado para acessar o bando de dados

		DB_USER=sirhennig

		//senha do usuário que acessará o banco de dados

		DB_PASS=1234

		//dialeto do banco de dados (verificar documentação do sequelize para preencher corretamente esse campo)

		DB_DLCT=mysql

		//nome que você deu ao banco de dados para essa aplicação

		DB_NAME=agenda

		//segredo a ser utilizado para criar e validar os JWTs

		TOKEN_SECRET=exemplo

		//diretório onde serão armazenados as fotos de perfil das pessoas cadastradas

		USER_FOTOS_DIRECTORY=/home/user/pictures
		```
	* execute o commando `npm install` para instalar o pacotes necessários
	* rode o sistema com o comando `npm run start`
	* pare o sistema (Ctrl + C)
	* execute o commando `npm run seedall:mysql` ou `npm run seedall:postgre` dependendo do banco que você preferiu utilizar
	* rode o sistema com o comando `npm run dev`

To view the Swagger UI interface:

```
open http://localhost:8080/docs
```

This project leverages the mega-awesome [swagger-tools](https://github.com/apigee-127/swagger-tools) middleware which does most all the work.
