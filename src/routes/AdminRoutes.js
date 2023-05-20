const Router = require('@koa/router');
const UsuarioController = require('../controllers/UsuarioController');
const DoacaoController = require('../controllers/DoacaoController');
const EquipamentoController = require('../controllers/EquipamentoController');
const HorarioController = require('../controllers/HorarioController');

const router = new Router({
  prefix: '/admin'
});

router
  .get('/usuario', async (ctx, next) => {
    await UsuarioController.get(ctx, next);
  })
  .patch('/usuario/:id', async (ctx, next) => {
    await UsuarioController.patch(ctx, next);
  })
  .del('/usuario/:id', async (ctx, next) => {
    await UsuarioController.remove(ctx, next);
  })

  .get('/doacao', async (ctx, next) => {
    await DoacaoController.get(ctx, next);
  })
  .post('/doacao', async (ctx, next) => {
    await DoacaoController.create(ctx, next);
  })
  .patch('/doacao/:id', async (ctx, next) => {
    await DoacaoController.patch(ctx, next);
  })
  .del('/doacao/:id', async (ctx, next) => {
    await DoacaoController.remove(ctx, next);
  })
  
  .get('/equipamento', async (ctx, next) => {
    await EquipamentoController.get(ctx, next);
  })
  .post('/equipamento', async (ctx, next) => {
    await EquipamentoController.create(ctx, next);
  })
  .patch('/equipamento/:id', async (ctx, next) => {
    await EquipamentoController.patch(ctx, next);
  })
  .del('/equipamento/:id', async (ctx, next) => {
    await EquipamentoController.remove(ctx, next);
  })
  
  .get('/horario', async (ctx, next) => {
    await HorarioController.get(ctx, next);
  })
  .post('/horario', async (ctx, next) => {
    await HorarioController.create(ctx, next);
  })
  .patch('/horario/:id', async (ctx, next) => {
    await HorarioController.patch(ctx, next);
  })
  .del('/horario/:id', async (ctx, next) => {
    await HorarioController.remove(ctx, next);
  })
  
  .post('/aprovaDoacao', async (ctx, next) => {
    await DoacaoController.aprovaDoacao(ctx, next);
  })
  .post('/rejeitaDoacao', async (ctx, next) => {
    await DoacaoController.rejeitaDoacao(ctx, next);
  })
  .post('/doacaoEntregue', async (ctx, next) => {
    await DoacaoController.doacaoEntregue(ctx, next);
  });

module.exports = router;
  