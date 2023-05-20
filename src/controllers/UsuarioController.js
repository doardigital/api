const Controller = require('./Controller');
const md5 = require('md5');
const models = require('../models');

const modelName = 'Usuario';
const requiredFields = [
  'nome',
  'senha',
  'email',
];

const notEditableFields = [
  'email',
];

const get = async (ctx, next) => {
  ctx.body = await Controller.get(ctx, modelName);
};

const getCurrentUser = async (ctx, next) => {
  const user = await models.Usuario.findByPk(ctx.user.id);
  if (user) delete user.dataValues.senha;
  ctx.body = user || {};
};

const create = async (ctx, next) => {
  ctx.request.body.senha = ctx.request.body.senha ? md5(ctx.request.body.senha) : ctx.request.body.senha;
  await Controller.create(ctx, modelName, requiredFields);
};

const patch = async (ctx, next) => {
  await Controller.edit(ctx, modelName, notEditableFields);
};

const remove = async (ctx, next) => {
  await Controller.remove(ctx, modelName);
};


module.exports = {
  get,
  create,
  patch,
  remove,
  getCurrentUser,
};
