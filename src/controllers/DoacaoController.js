const Router = require('@koa/router');
const Controller = require('./Controller');

const router = new Router({
  prefix: '/doacao'
});

const modelName = 'Doacao';
const requiredFields = [
  'idUsuario',
];

const notEditableFields = [
  'idUsuario',
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
  