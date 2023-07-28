FROM postgres:14.0-alpine3.14
ENV POSTGRES_PASSWORD=password
COPY ./sql/ /docker-entrypoint-initdb.d/
