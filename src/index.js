const Koa = require('koa');
const jwt = require('koa-jwt');
const Router = require('@koa/router');
const AuthenticationController = require('./controllers/AuthenticationController');
const DoacaoController = require('./controllers/DoacaoController');

const app = new Koa();

app
  .use(AuthenticationController.routes())
  .use(jwt({ secret: process.env.JWT_KEY }))
  .use(DoacaoController.routes())
  .listen(process.env.PORT);
