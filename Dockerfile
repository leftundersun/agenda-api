FROM node:16.6.2-stretch

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["nodemon", "index.ts"]