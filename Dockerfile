ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine as base
RUN apk update && apk add --no-cache\
  curl \
  vim \
  git
COPY . /usr/src/shopnow
WORKDIR /usr/src/shopnow
RUN npm install
CMD ["npm", "run dev"]