ARG NODE_VERSION=22.3.0

FROM node:${NODE_VERSION}-alpine as base
RUN apk update && apk add --no-cache\
  curl \
  vim \
  git
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "dev"]