# Paso 1: Construyendo la aplicacion
FROM node:12.18 as node

RUN mkdir /app
WORKDIR /app
COPY --chown=node:node . .

RUN npm install
ARG config=production
RUN npm run build -- --prod --configuration=$config
RUN ls dist

#Paso 2: Creando servidor Nginx
FROM nginx:alpine

COPY --from=node /app/dist/csv-angular /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
