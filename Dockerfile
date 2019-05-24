FROM node:10
WORKDIR /app
COPY . /app

RUN npm install -g yarn
RUN yarn install
RUN cd /app && yarn global add pm2

EXPOSE 3003
