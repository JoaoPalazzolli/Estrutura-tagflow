FROM node:18

WORKDIR /usr/src/tagflow

COPY . /usr/src/tagflow/

RUN yarn install

EXPOSE 3000

ENTRYPOINT [ "yarn", "ts-node", "./src/Server.ts" ]