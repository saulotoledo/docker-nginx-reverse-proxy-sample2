FROM mysql:5.7

ENV MYSQL_DATABASE sample-db
ENV MYSQL_ROOT_PASSWORD root

COPY --chmod=444 init.sql /docker-entrypoint-initdb.d/

CMD [ "--innodb-use-native-aio=0" ]
