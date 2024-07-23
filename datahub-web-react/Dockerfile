FROM registry.access.redhat.com/ubi8/nodejs-20:latest as build

ENV NODE_ENV=production
ENV REACT_APP_THEME_CONFIG=theme_light.config.json
# ENV SKIP_PREFLIGHT_CHECK=true
# ENV REACT_APP_PROXY_TARGET=http://localhost:80

RUN npm install -g yarn

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install

# Copia o código da aplicação
COPY . .

# # Gera a build da aplicação
RUN yarn run build

# # Etapa 2: Servir a aplicação com um servidor Nginx
FROM nginx:alpine

# Copia a build da aplicação para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# COPY ./nginx-default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
