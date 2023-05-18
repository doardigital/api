const Router = require('@koa/router');

const router = new Router();

router
  .get('/', ctx => {
    ctx.body = 'Doar Digital API';
  });


module.exports = router;
  