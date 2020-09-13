FROM node:12.10.0-alpine

WORKDIR /web-front

COPY . .
RUN npm install -g mirror-config-china --registry=http://registry.npm.taobao.org
RUN npm i --registry https://registry.npm.taobao.org
RUN npm run build

RUN rm -rf node_modules && \
  NODE_ENV=production npm install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true


EXPOSE 3001

CMD [ "npm", "run", "start" ]
