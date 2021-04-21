FROM node:15-alpine3.13

WORKDIR /app

COPY . .
RUN npm install

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3000

ENTRYPOINT [ "dockerize", "-wait", "tcp://db:3306", "-timeout", "20000s", "docker-entrypoint.sh", "node", "index.js" ]
