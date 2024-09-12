# Usar a imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Instalar dependências de produção
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Compilar o código TypeScript para JavaScript
RUN npx prisma generate && npm run build

# Expor a porta da aplicação
EXPOSE 3001

# Executar a aplicação
CMD ["npm", "run", "prod"]
