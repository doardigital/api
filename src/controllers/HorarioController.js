const Controller = require('./Controller');

const modelName = 'Horario';
const requiredFields = [
  'dataHora',
];

const notEditableFields = [];

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


module.exports = {
  get,
  create,
  patch,
  remove,
};
  