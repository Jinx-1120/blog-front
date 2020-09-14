FROM node:12.10.0-alpine

WORKDIR /usr/src/app
COPY package.json ./
ARG envArg=devserver
RUN npm config set registry=https://registry.npm.taobao.org
RUN mkdir -p /usr/src/app/node-sass
COPY binding.node /usr/src/app/node-sass
ENV SASS_BINARY_PATH /usr/src/app/node-sass/binding.node
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start" ]
