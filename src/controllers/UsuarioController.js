const Controller = require('./Controller');
const md5 = require('md5');

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
};
