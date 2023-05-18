const Koa = require('koa');
const jwt = require('koa-jwt');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const { bearerToken } = require('koa-bearer-token');

const ErrorHandling = require('./lib/errorHandling');
const { session } = require('./lib/authentication');
const AuthenticationController = require('./controllers/AuthenticationController');
const UsuarioController = require('./controllers/UsuarioController');
const UsuarioPublicController = require('./controllers/UsuarioPublicController');
const EquipamentoController = require('./controllers/EquipamentoController');
const DoacaoController = require('./controllers/DoacaoController');
const HorarioController = require('./controllers/HorarioController');
const WelcomeController = require('./controllers/WelcomeController');

const app = new Koa();

app.on('error', ErrorHandling.handle);

app
  .use(bodyParser())
  .use(AuthenticationController.routes())
  .use(WelcomeController.routes())
  .use(UsuarioPublicController.routes())
  .use(jwt({ secret: process.env.JWT_KEY }))
  .use(bearerToken())
  .use(session())
  .use(UsuarioController.routes())
  .use(EquipamentoController.routes())
  .use(DoacaoController.routes())
  .use(HorarioController.routes())
  .listen(process.env.PORT);

module.exports = app;
