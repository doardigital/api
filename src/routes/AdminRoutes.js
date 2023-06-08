const Router = require('@koa/router');
const UsuarioController = require('../controllers/UsuarioController');
const EquipamentoController = require('../controllers/EquipamentoController');
const ImagemEquipamentoController = require('../controllers/ImagemEquipamentoController');

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
  
  .get('/imagemEquipamento', async (ctx, next) => {
    await ImagemEquipamentoController.get(ctx, next);
  })
  .post('/imagemEquipamento', async (ctx, next) => {
    await ImagemEquipamentoController.create(ctx, next);
  })
  .patch('/imagemEquipamento/:id', async (ctx, next) => {
    await ImagemEquipamentoController.patch(ctx, next);
  })
  .del('/imagemEquipamento/:id', async (ctx, next) => {
    await ImagemEquipamentoController.remove(ctx, next);
  });;

module.exports = router;
  