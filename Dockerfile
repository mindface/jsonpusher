FROM node:20.9.0

RUN apt-get update
RUN apt-get install -y xdg-utils

WORKDIR /app

RUN npm install -g yarn --force

RUN yarn install

# github actionsの確認
# act --container-architecture arm64 -P ubuntu-latest=node:20
