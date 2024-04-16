FROM node:20-slim

WORKDIR /app

COPY package*.json tsconfig*.json nest-cli.json .npmrc /app/

RUN npm install

COPY src /app/src

RUN npm run build

CMD ["npm", "run", "start:prod"]