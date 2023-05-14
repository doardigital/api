const Router = require('@koa/router');
const Authentication = require('../lib/authentication');

const router = new Router();

router.get('/login', (ctx, next) => {
  ctx.body = Authentication.generateToken();
});

module.exports = router;
