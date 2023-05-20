const Router = require('@koa/router');
const DoacaoController = require('../controllers/DoacaoController');
const EquipamentoController = require('../controllers/EquipamentoController');
const UsuarioController = require('../controllers/UsuarioController');

const router = new Router({
  prefix: '/common'
});

router
  .get('/meuPerfil', async (ctx, next) => {
    await UsuarioController.getCurrentUser(ctx, next);
  })
  .get('/minhasDoacoes', async (ctx, next) => {
    await DoacaoController.minhasDoacoes(ctx, next);
  })
  .get('/equipamentosDoados', async (ctx, next) => {
    await EquipamentoController.equipamentosDoados(ctx, next);
  })
  .post('/criarDoacao', async (ctx, next) => {
    ctx.request.body.idUsuario = ctx.user.id;
    await DoacaoController.create(ctx, next);
  })
  .post('/criarEquipamento', async (ctx, next) => {
    console.log(ctx.request);
    await EquipamentoController.create(ctx, next);
  });

module.exports = router;
  