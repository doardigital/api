const jwt = require('jsonwebtoken');
const models = require('../models');
const { Op } = require('sequelize');
const md5 = require('md5');
const jwt_decode = require('jwt-decode');
const jwtKoa = require('koa-jwt');

const generateToken = (encryptedObject) => {
  return jwt.sign(
    encryptedObject,
    process.env.JWT_KEY,
    {
      expiresIn: process.env.JWT_EXPIRATION
    }
  );
};

const checkAccess = async (userAcess, password) => {
  const users = await models.Usuario.findAll({
    where: {
      [Op.or]: [
        { acesso: userAcess },
        { email: userAcess },
      ],
      senha: md5(password),
    },
  });

  return users.length > 0 ? users[0] : false;
};

const session = () => {
  return async (ctx, next) => {
    ctx.user = { ...jwt_decode(ctx.request.token) }
    await next();
  }
};

const admin = () => {
  return async (ctx, next) => {
    if (!ctx.user.ehAdministrador) {
      ctx.body = 'O recurso não existe ou você precisa ser administrador para acessá-lo.';
      ctx.status = 401;
      return;
    }
    await next();
  }
};

module.exports = {
  generateToken,
  checkAccess,
  session,
  admin,
};
