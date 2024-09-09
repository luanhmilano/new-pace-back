# Usar a imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package*.json ./

# Instalar dependências de produção
RUN npm install --only=production

# Copiar o restante dos arquivos do projeto
COPY . .

# Gerar o Prisma Client
RUN npm run prisma:generate

# Compilar o código TypeScript para JavaScript
RUN npm run build

# Expor a porta da aplicação
EXPOSE 4000

# Definir variáveis de ambiente para produção
ENV NODE_ENV=production

# Executar a aplicação
CMD ["npm", "run", "start"]
