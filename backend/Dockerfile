FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# Install monitoring client
RUN npm install prom-client winston

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]