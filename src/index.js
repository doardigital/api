const Koa = require('koa');
const jwt = require('koa-jwt');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const { koaBody } = require('koa-body');
const { bearerToken } = require('koa-bearer-token');
const cors = require('@koa/cors');

const ErrorHandling = require('./lib/errorHandling');
const { session, admin } = require('./lib/authentication');
const PublicRoutes = require('./routes/PublicRoutes');
const CommonRoutes = require('./routes/CommonRoutes');
const AdminRoutes = require('./routes/AdminRoutes');

const app = new Koa();

app.on('error', ErrorHandling.handle);

app
  .use(cors())
  .use(koaBody({ multipart: true }))
  .use(bodyParser())
  .use(PublicRoutes.routes())
  .use(jwt({ secret: process.env.JWT_KEY }))
  .use(bearerToken())
  .use(session())
  .use(CommonRoutes.routes())
  .use(admin())
  .use(AdminRoutes.routes())
  .listen(process.env.PORT);

module.exports = app;
