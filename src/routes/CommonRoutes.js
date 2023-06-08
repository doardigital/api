const Router = require('@koa/router');
const EquipamentoController = require('../controllers/EquipamentoController');
const UsuarioController = require('../controllers/UsuarioController');
const ImagemEquipamentoController = require('../controllers/ImagemEquipamentoController');
const fs = require('fs').promises;
const send = require('koa-send');

const router = new Router({
  prefix: '/common'
});

router
  .get('/meuPerfil', async (ctx, next) => {
    await UsuarioController.getCurrentUser(ctx, next);
  })
  .get('/equipamentosDoados', async (ctx, next) => {
    await EquipamentoController.equipamentosDoados(ctx, next);
  })
  .post('/criarEquipamento', async (ctx, next) => {
    ctx.request.body.idUsuario = ctx.user.id;
    await EquipamentoController.create(ctx, next);
  })
  .post('/uploadImagemEquipamento/:id', async (ctx, next) => {
    const file = ctx.request.files?.file;
    const fileData = await fs.readFile(file.filepath);
    const base64 = fileData.toString('base64');

    ctx.request.body = { ...ctx.request.body, base64, tipo: file.mimetype, idEquipamento: ctx.params.id };
    await ImagemEquipamentoController.create(ctx, next);
  })
  .get('/getImagensEquipamento/:id', async (ctx, next) => {
    const images = await ImagemEquipamentoController.getById(ctx, next);
    const imagesBase64 = images.map(i => {
      const base64 = `data:${i.tipo};base64,${i.base64.toString('base64')}`;
      return {
        base64,
      }
    });
    ctx.body = imagesBase64;
  });

module.exports = router;
  