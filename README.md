# API Agenda de contatos Node.js

## Visão geral
Essa API ainda está em desenvolvimento.

É apenas um exemplo. Nela é possível cadastrar pessoas com endereço e contatos.

Um front-end Vue.js também está em desenvolvimento, você pode conferir em https://github.com/sirhennig/agenda-spa.

### Rodando pela primeira vez
Para rodar a api pela primeira vez, siga os seguintes passos:

* crie um banco de dados para essa aplicação

* crie um arquivo chamado `.env` na raiz do projeto como o exemplo abaixo:
```
// porta na qual sua API estará visível
PORT=3000

// máquina na qual está seu banco de dados
DB_HOST=localhost

// usuário a ser utilizado para acessar o bando de dados
DB_USER=sirhennig

// senha do usuário que acessará o banco de dados
DB_PASS=1234

// dialeto do banco de dados (verificar documentação do sequelize)
DB_DLCT=mysql

// nome que você deu ao banco de dados para essa aplicação
DB_NAME=agenda

// diretório onde serão armazenados as fotos de perfil das pessoas cadastradas
USER_FOTOS_DIRECTORY=/home/user/pictures

// caminho para uma foto de perfil a ser utilizada pelo mock
DEFAULT_PROFILE_PICTURE=./user-default.png
```
* execute o commando `npm install` para instalar o pacotes necessários
* configure o banco de dados com o comando `npm run db:create`
* inicie o banco de dados com o comando `npm run db:seed`
* rode o sistema com o comando `npm run dev`

### Criando mock data
Para criar dados de teste, você pode executar o comando `npm run mock`, isso irá cadastrar 10.000 pessoas com endereço e 2 contatos cada.
