FROM node:20.8.0

RUN apt-get update
RUN apt-get install -y xdg-utils

WORKDIR /app

RUN yarn install
