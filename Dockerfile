FROM node:20

WORKDIR /

COPY packag*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]