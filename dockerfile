FROM node:16.10 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY ./client/package*.json ./client/
COPY ./server/package*.json ./server/
COPY ./commonPackages ./commonPackages

# Install all dependencies
RUN npm run install:all

EXPOSE 7000
