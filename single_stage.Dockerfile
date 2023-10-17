FROM node:18-alpine

RUN adduser -S api
WORKDIR /app
ENV PING_LISTEN_PORT=3000
COPY package*.json /app
RUN chown -R api /app
USER api
RUN npm i
COPY . /app

ENTRYPOINT ["npm", "start"]