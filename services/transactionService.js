const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const findAll = async (req, res, next) => {
  const { period, description } = req.query;

  let condition = {};

  if (!period) {
    res.status(400).send({
      message:
        'É necessário informar o parâmetro "period", cujo valor  deve estar no formato yyyy-mm',
    });
  }

  if (description) {
    condition = {
      yearMonth: period,
      description: { $regex: new RegExp(description), $options: 'i' },
    };
  } else {
    condition = { yearMonth: period };
  }

  try {
    const data = await TransactionModel.find(condition);

    if (!data) {
      res.status(404).send('not found');
    } else {
      res.send({ length: data.length, transactions: data });
    }
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  } = req.body;

  const transaction = new TransactionModel({
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  });

  try {
    const data = await transaction.save();
    res.send({ message: 'Transação inserida com sucesso', data: data });
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req, res, next) => {
  if (!req.body) {
    res.status(400), send({ message: 'Dados para atualização vazios' });
  }

  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    if (!data) {
      res.status(404).send({ message: 'Registro não encontrado' });
    } else {
      res.send({ message: 'Registro atualizado com sucesso!', data: data });
    }
  } catch (error) {
    next(error);
  }
};

const removeOne = async (req, res, next) => {
  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndDelete({ _id: id });

    if (!data) {
      res.status(404).send({ message: 'Registro não encontrado' });
    } else {
      res.send({ message: 'Registro excluido com sucesso!' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, create, updateOne, removeOne };
