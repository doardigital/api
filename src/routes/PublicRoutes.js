const Router = require('@koa/router');
const { login } = require('../controllers/AuthenticationController');
const UsuarioController = require('../controllers/UsuarioController');
const WelcomeController = require('../controllers/WelcomeController');

const router = new Router();

router
  .get('/', async (ctx, next) => {
    WelcomeController.get(ctx, next);
  })
  .post('/login', async (ctx, next) => {
    await login(ctx, next);
  })
  .post('/usuario', async (ctx, next) => {
    await UsuarioController.create(ctx, next);
  });


module.exports = router;
  