FROM node:latest

WORKDIR /app

# Copy package.json first to utilize caching layers
# Wildc ard for both package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

CMD npm run dev

EXPOSE 5000