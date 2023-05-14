FROM node:alpine
WORKDIR /usr/src/app
COPY ./src .
EXPOSE 3000
# CMD npm install && npx sequelize-cli db:migrate && npm start
CMD npm install && npm start