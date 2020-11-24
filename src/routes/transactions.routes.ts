import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import multer from 'multer'
import uploadConfig from '../config/upload'

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';


const transactionsRouter = Router();
const upload = multer(uploadConfig)

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository)
  const transactions = await transactionsRepository.find()
  const balance = await transactionsRepository.getBalance()
  return response.json({transactions, balance})
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body
  const createTransactionService = new CreateTransactionService()
  const transaction = await createTransactionService.execute({ title, value, type, category })
  return response.json({
    id: transaction.id,
    title,
    value,
    category
  })

});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  const deleteTransactionService = new DeleteTransactionService()
  await deleteTransactionService.execute({id})
  return response.status(204).send()
});

transactionsRouter.post('/import', upload.single('importfile'), async (request, response) => {
  const importTransactionsService = new ImportTransactionsService()
  const transactions = await importTransactionsService.execute({
    importFileName: request.file.filename
  })
  return response.json(transactions)
});

export default transactionsRouter;
