FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.20-alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf


# Remove default nginx pages
RUN rm -rf /etc/nginx/html/*

# Add react build to nginx pages
COPY --from=build /app/build /etc/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

