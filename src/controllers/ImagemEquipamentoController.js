const { Op } = require("sequelize");
const Controller = require('./Controller');
const models = require('../models');

const modelName = 'ImagemEquipamento';
const requiredFields = [
  'base64',
];

const notEditableFields = [];

const get = async (ctx, next) => {
  ctx.body = await Controller.get(ctx, modelName);
};

const getById = async (ctx, next) => {
  const images = await models[modelName].findAll({
    where: {
      idEquipamento: ctx.params.id
    }
  })
  return images;
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

module.exports = {
  get,
  getById,
  create,
  patch,
  remove,
};
  