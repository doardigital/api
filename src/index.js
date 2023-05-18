const Koa = require('koa');
const jwt = require('koa-jwt');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const ErrorHandling = require('./lib/errorHandling');
const AuthenticationController = require('./controllers/AuthenticationController');
const DoacaoController = require('./controllers/DoacaoController');
const UsuarioController = require('./controllers/UsuarioController');
const WelcomeController = require('./controllers/WelcomeController');

const app = new Koa();

app.on('error', ErrorHandling.handle);

app
  .use(bodyParser())
  .use(AuthenticationController.routes())
  .use(WelcomeController.routes())
  .use(jwt({ secret: process.env.JWT_KEY }))
  .use(DoacaoController.routes())
  .use(UsuarioController.routes())
  .listen(process.env.PORT);

module.exports = app;
