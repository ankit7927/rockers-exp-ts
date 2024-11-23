FROM node:20-alpine AS builder

RUN mkdir rockers-server

WORKDIR /rockers-server

COPY . .

RUN npm i -g pm2

RUN npm install --include prod

RUN npm run build

EXPOSE ${SERVER_PORT}