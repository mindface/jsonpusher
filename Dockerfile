FROM node:20.9.0

RUN apt-get update
RUN apt-get install -y xdg-utils

WORKDIR /app

RUN yarn install
