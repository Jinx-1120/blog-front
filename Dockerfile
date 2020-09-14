FROM node:12.10.0-alpine

WORKDIR /web-front
COPY package.json ./

RUN npm config set registry=https://registry.npm.taobao.org
RUN mkdir -p /web-front/node-sass
COPY binding.node /web-front/node-sass
ENV SASS_BINARY_PATH /web-front/node-sass/binding.node
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start" ]
