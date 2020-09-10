const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService');

transactionRouter.get('/', transactionService.findAll);
transactionRouter.post('/', transactionService.create);
transactionRouter.put('/:id', transactionService.updateOne);
transactionRouter.delete('/:id', transactionService.removeOne);

module.exports = transactionRouter;
