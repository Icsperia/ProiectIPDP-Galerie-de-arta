FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./routes ./routes
COPY ./models ./models
COPY ./views/pages ./views/pages
COPY ./src ./src

COPY AuthApp.js .
COPY IndexApp.js .
COPY CartApp.js .
COPY SetupExpress.js .
COPY DatabaseConnection.js .

CMD ["node", "AuthApp.js"]
