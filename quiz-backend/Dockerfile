FROM node:20.10.0-alpine

WORKDIR /code
COPY package.json package-lock.json ./
RUN npm ci
COPY . /code

CMD [ "npm", "run", "start" ]
