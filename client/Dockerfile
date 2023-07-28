FROM node:16-alpine3.11
WORKDIR /app
ENV CHOKIDAR_USEPOLLING=true
COPY . /app
RUN ["npm", "install"]
EXPOSE 3000
ENTRYPOINT ["npm", "start"]