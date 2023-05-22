const Authentication = require('../lib/authentication');

const login = async (ctx, next) => {
  const { acesso, senha } = ctx.request.body;
  const user = await Authentication.checkAccess(acesso, senha);
  if (!user) {
    ctx.status = 401;
    return;
  }

  const userToBeEncrypted = {
    id: user.dataValues.id,
    ehAdministrador: user.dataValues.ehAdministrador,
  };

  delete user.dataValues.senha;

  ctx.body = {
    token: Authentication.generateToken(userToBeEncrypted),
    ...user.dataValues,
  }
};

module.exports = {
  login,
};
