FROM node:14.18.2-stretch

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install sequelize-cli

COPY . .

RUN npm run db:create

RUN npm run db:seed

CMD ["nodemon", "index.ts"]