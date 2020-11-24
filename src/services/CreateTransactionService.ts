import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string
  value: number
  type: 'income' | 'outcome'
  category: string
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {

    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Tipo de transação inválida.', 400)
    }

    const categoriesRepository = getRepository(Category)
    if (!(await categoriesRepository.findOne({ where: { title: category } }))) {
      await categoriesRepository.save(categoriesRepository.create({ title: category }))
    }
    const findCategory = await categoriesRepository.findOne({ where: { title: category } })
    const transactionsRepository = getCustomRepository(TransactionsRepository)
    const transction = transactionsRepository.create({ title, value, type, category: findCategory })
    await transactionsRepository.save(transction)
    if (type === 'outcome') {
      const { total } = await transactionsRepository.getBalance()
      if (value > total) {
        throw new AppError('Voce não posusi saldo para esta transação', 400)
      }
    }

    return transction
  }
}

export default CreateTransactionService;
