const models = require('../models');

fieldsNotFilled = [];
editableFieldsChanged = [];

get = async (ctx, modelName) => {
  const dados = await models[modelName].findAll();
  ctx.status = 200;
  return dados;
};

create = async (ctx, modelName, requiredFields) => {
  const data = { ...ctx.request.body };
  if (isAnyRequiredFieldNotFilled(requiredFields, data)) {
    ctx.body = createFieldsNotFilledMessage();
    ctx.status = 400;
    return;
  }
  
  await models[modelName].create(data);
  ctx.status = 201;
  ctx.body = `${modelName} criado com sucesso.`
};

edit = async (ctx, modelName, notEditableFields) => {
  const data = { ...ctx.request.body };
  if (isAnyNotEditableFieldEdited(notEditableFields, data)) {
    ctx.body = createNotEditableFieldsEditedMessage();
    ctx.status = 400;
  }

  const id = ctx.params.id;
  const registro = await models[modelName].findByPk(id);
  if (!registro) {
    ctx.status = 404;
    return;
  }
  models[modelName].update({ ...ctx.request.body }, { where: { id }});
  ctx.status = 200;
};

remove = async (ctx, modelName) => {
  const id = ctx.params.id;
  const registro = await models[modelName].findByPk(id);
  if (!registro) {
    ctx.status = 404;
    return;
  }
  models[modelName].destroy({ where: { id }});
  ctx.status = 200;
};

isAnyRequiredFieldNotFilled = (requiredFieldsNames, data) => {
  fieldsNotFilled = [];
  for (const name of requiredFieldsNames) {
    if (!data[name]) {
      fieldsNotFilled.push(name);
    }
  }
  return fieldsNotFilled.length > 0;
};

isAnyNotEditableFieldEdited = (notEditableFields, data) => {
  editableFieldsChanged = [];
  for (const name of notEditableFields) {
    if (data[name]) {
      editableFieldsChanged.push(name);
    }
  }
  return editableFieldsChanged.length > 0;
};

createNotEditableFieldsEditedMessage = () => {
  return `O(s) campo(s) ${fieldsNotFilled.join(', ')} não podem ser alterados`;
};

createFieldsNotFilledMessage = () => {
  return `O(s) campo(s) ${fieldsNotFilled.join(', ')} não foram preenchidos`;
};

module.exports = {
  get,
  create,
  edit,
  remove,
};