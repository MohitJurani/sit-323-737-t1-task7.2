FROM node:16

WORKDIR  /

COPY package*.json ./

RUN npm install

COPY server.js .

COPY dbConnection.js .

COPY public/* ./public/

EXPOSE 3000

HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1

CMD ["node","server.js"]