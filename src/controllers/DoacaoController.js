const Controller = require('./Controller');
const models = require('../models');

const modelName = 'Doacao';
const requiredFields = [
  'idUsuario',
];

const notEditableFields = [
  'idUsuario',
];

const get = async (ctx, next) => {
  ctx.body = await Controller.get(ctx, modelName);
};

const create = async (ctx, next) => {
  await Controller.create(ctx, modelName, requiredFields);
};

const patch = async (ctx, next) => {
  await Controller.edit(ctx, modelName, notEditableFields);
};

const remove = async (ctx, next) => {
  await Controller.remove(ctx, modelName);
};

const minhasDoacoes = async (ctx, next) => {
  ctx.body = await models.Doacao.findAll({
    where: {
      idUsuario: ctx.user.id,
    }
  });
};

module.exports = {
  get,
  create,
  patch,
  remove,
  minhasDoacoes,
};
  