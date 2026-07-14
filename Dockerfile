FROM node:24-alpine3.23

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 8000

CMD ["npm", "run", "prod"]