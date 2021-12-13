FROM node:16.10

WORKDIR /app
EXPOSE 7000

COPY package*.json ./
COPY ./client/package*.json ./client/
COPY ./server/package*.json ./server/
COPY ./commonPackages ./commonPackages

RUN npm run install:all
