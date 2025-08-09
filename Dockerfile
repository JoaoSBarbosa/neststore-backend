# Etapa 1 - Build
FROM node:22-alpine AS builder
WORKDIR /app

# Copia os arquivos de configuração
COPY package*.json ./
COPY tsconfig*.json ./

# Instala dependências (dev + prod para compilar)
RUN npm install

# Copia o código-fonte
COPY . .

# Compila o TypeScript para JavaScript
RUN npm run build

# Etapa 2 - Runtime
FROM node:22-alpine AS runner
WORKDIR /app

# Instala bash (necessário para o wait-for-it.sh)
RUN apk add --no-cache bash

# Copia apenas as dependências de produção
COPY package*.json ./
RUN npm install --omit=dev

# Copia os arquivos compilados da etapa anterior
COPY --from=builder /app/dist ./dist

# Copia o script wait-for-it.sh e torna executável
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copia o .env
COPY .env .env

# Porta exposta pela aplicação Nest
EXPOSE 3000

# Comando padrão para rodar a aplicação
CMD ["node", "dist/main.js"]
