FROM node:12.10.0-alpine

WORKDIR /web-front

COPY . .
RUN npm ci
RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start" ]
