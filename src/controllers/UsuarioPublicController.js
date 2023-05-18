const Router = require('@koa/router');
const Controller = require('./Controller');
const md5 = require('md5');

const router = new Router({
  prefix: '/usuario'
});

const modelName = 'Usuario';
const requiredFields = [
  'nome',
  'senha',
  'email',
];

const notEditableFields = [
  'email',
];

router
  .post('/', async (ctx, next) => {
    ctx.request.body.senha = ctx.request.body.senha ? md5(ctx.request.body.senha) : ctx.request.body.senha;
    await Controller.create(ctx, modelName, requiredFields);
  });

module.exports = router;
  