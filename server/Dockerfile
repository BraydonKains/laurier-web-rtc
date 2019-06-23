FROM node:12.4.0-stretch

RUN mkdir /api
WORKDIR /api

COPY package.json /api
COPY package-lock.json /api
RUN npm install
COPY . /api

EXPOSE 4000
CMD ["npm", "start"]
