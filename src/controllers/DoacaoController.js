const Router = require('@koa/router');

const router = new Router({
  prefix: '/doacao'
});

router
  .get('/', (ctx, next) => {
    ctx.body = [
      {
        id: 2,
        descricao: 'Doação 1'
      }
    ];
  })
  .post('/', (ctx, next) => {
    ctx.body = 'Salvo com sucesso!'
    ctx.status = 200
  });

module.exports = router;
  