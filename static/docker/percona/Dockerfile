FROM percona:latest

RUN chown -R mysql:root /var/lib/mysql/

COPY docker-entrypoint-initdb.d /docker-entrypoint-initdb.d

ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_DATABASE

RUN sed -i \
    -e "s|__DB_USERNAME__|${DB_USERNAME}|g" \
    -e "s|__DB_PASSWORD__|${DB_PASSWORD}|g" \
    -e "s|__DB_DATABASE__|${DB_DATABASE}|g" \
    /docker-entrypoint-initdb.d/createdb.sql

ENTRYPOINT ["/docker-entrypoint.sh"]

USER mysql
EXPOSE 3306
CMD ["mysqld"]