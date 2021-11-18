FROM node:16.13.0-alpine As development
RUN apk add --no-cache php8-cli php8-json
RUN ln -s /usr/bin/php8 /usr/bin/php
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.13.0-alpine as production
RUN apk add --no-cache php8-cli php8-json
RUN ln -s /usr/bin/php8 /usr/bin/php
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
