#!/bin/sh

npm install

dockerize -wait tcp://db:3306 -timeout 20000s docker-entrypoint.sh node index.js
