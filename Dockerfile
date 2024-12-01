FROM node:18

WORKDIR /usr/src/tagflow

# Copiar apenas arquivos de configuração para aproveitar o cache de build
COPY package*.json ./
RUN yarn install

# Instalar o Prisma CLI e o Prisma Client
RUN yarn add prisma @prisma/client

# Copiar o restante dos arquivos para o container
COPY . .

# Gerar o Prisma Client - rodando `prisma generate` no ambiente Docker
RUN npx prisma generate

EXPOSE 3000

CMD ["yarn", "ts-node", "./src/Server.ts"]

