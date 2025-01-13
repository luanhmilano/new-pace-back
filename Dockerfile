# Usar a imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho no container
WORKDIR /user/src/app
COPY . .

RUN apt update && apt upgrade -y
RUN apt install -y python3 python3-pip

# Copiar o package.json e o package-lock.json
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/


WORKDIR /user/src/app
RUN apt-get install -y python3-requests
RUN apt-get install -y python3-bs4

# Instalar dependências de produção
RUN npm install

# Compilar o código TypeScript para JavaScript
RUN npx prisma generate && npm run build

# Expor a porta da aplicação
EXPOSE 3001

# Executar a aplicação
CMD ["npm", "run", "prod"]
