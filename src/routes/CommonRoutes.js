const Router = require('@koa/router');
const DoacaoController = require('../controllers/DoacaoController');
const EquipamentoController = require('../controllers/EquipamentoController');

const router = new Router();

router
  .get('/minhasDoacoes', async (ctx, next) => {
    await DoacaoController.minhasDoacoes(ctx, next);
  })
  .get('/equipamentosDoados', async (ctx, next) => {
    await EquipamentoController.equipamentosDoados(ctx, next);
  });

module.exports = router;
  