const Router = require('@koa/router');
const models = require('../models');
const Controller = require('./Controller');

const router = new Router({
  prefix: '/usuario'
});

const modelName = 'Usuario';
const requiredFields = [
    'nome',
    'acesso',
    'senha',
    'email',
];

const notEditableFields = [
    'email',
];

router
  .get('/', async (ctx, next) => {
    ctx.body = await Controller.get(ctx, modelName);
  })
  .post('/', async (ctx, next) => {
    await Controller.create(ctx, modelName, requiredFields);
  })
  .patch('/:id', async (ctx, next) => {
    await Controller.edit(ctx, modelName, notEditableFields);
  })
  .delete('/:id', async (ctx, next) => {
    await Controller.remove(ctx, modelName);
  });


module.exports = router;
  