FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

COPY production.env .env

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "preview"]
