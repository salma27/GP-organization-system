FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./

COPY tsconfig.json ./

COPY .env ./.env

COPY nodemon.json ./nodemon.json

RUN npm ci

FROM base as development
VOLUME /home/node/app/src
