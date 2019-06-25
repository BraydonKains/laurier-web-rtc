FROM node:12.4.0-stretch

RUN mkdir /api
WORKDIR /api

COPY package.json /api
COPY package-lock.json /api
RUN npm install
COPY . /api
ENV PATH "$PATH:/api/node_modules/db-migrate/bin/db-migrate"

EXPOSE 4000
CMD ["npm", "start"]
