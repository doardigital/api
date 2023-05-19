const { Op } = require("sequelize");
const Controller = require('./Controller');
const models = require('../models');

const modelName = 'Equipamento';
const requiredFields = [
  'nome',
  'modelo',
  'marca',
  'tempoUso',
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

const equipamentosDoados = async (ctx, next) => {
  const doacoes = await models.Doacao.findAll({
    where: {
      idUsuario: ctx.user.id,
    },
  });

  ctx.body = await models.Equipamento.findAll({
    where: {
      idDoacao: {
        [Op.in]: doacoes.map(doacao => doacao.dataValues.id),
      }
    }
  });
};

module.exports = {
  get,
  create,
  patch,
  remove,
  equipamentosDoados,
};
  