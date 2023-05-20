const Controller = require('./Controller');
const models = require('../models');

const STATUS_APROVADO = 'A';
const STATUS_REJEITADO = 'R';
const STATUS_PENDENTE = 'P';

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

const aprovaDoacao = async (ctx, next) => {
  const { idDoacao } = ctx.request.body;
  const doacao = await models.Doacao.findOne({
    where: {
      id: idDoacao,
      statusDoacao: STATUS_PENDENTE,
    }
  });

  if (!doacao) {
    ctx.body = 'Doação não encontrada ou já processada.';
    ctx.status = 202;
    return;
  }

  doacao.statusDoacao = 'A';
  await doacao.save();
  ctx.status = 200;
};

const rejeitaDoacao = async (ctx, next) => {
  const { idDoacao } = ctx.request.body;
  const doacao = await models.Doacao.findOne({
    where: {
      id: idDoacao,
      statusDoacao: STATUS_PENDENTE,
    }
  });

  if (!doacao) {
    ctx.body = 'Doação não encontrada ou já processada.';
    ctx.status = 202;
    return;
  }

  doacao.statusDoacao = 'R';
  await doacao.save();
  ctx.status = 200;
};

const doacaoEntregue = async (ctx, next) => {
  const { idDoacao } = ctx.request.body;
  const doacao = await models.Doacao.findOne({
    where: {
      id: idDoacao,
      statusDoacao: STATUS_APROVADO,
    }
  });

  if (!doacao) {
    ctx.body = 'Doação não encontrada ou ainda não aprovada.';
    ctx.status = 202;
    return;
  }
  
  doacao.statusDoacao = 'E';
  await doacao.save();
  ctx.status = 200;
};

module.exports = {
  get,
  create,
  patch,
  remove,
  minhasDoacoes,
  aprovaDoacao,
  rejeitaDoacao,
  doacaoEntregue,
};
  