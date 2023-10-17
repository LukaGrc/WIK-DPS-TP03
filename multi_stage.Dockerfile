FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json /app
RUN npm i
COPY . /app
RUN npx tsc


FROM node:18-alpine AS run
ENV PING_LISTEN_PORT=3000
WORKDIR /app
COPY --from=build /app/build /app
RUN adduser -S api
RUN chown -R api /app
USER api
ENTRYPOINT ["node", "index.js"]
