FROM node:alpine3.11

WORKDIR /usr/src/app
COPY package.json ./
ARG envArg=devserver
RUN npm config set registry=https://registry.npm.taobao.org

RUN npm install
COPY . .
RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start" ]
