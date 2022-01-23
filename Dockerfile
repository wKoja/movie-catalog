FROM node:12

WORKDIR ../alinea-test

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080

CMD ["node", "."]
