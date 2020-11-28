import { EntityRepository, getRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {

    const transactions = await getRepository(Transaction).find();
    const balance = { income: 0, outcome: 0, total: 0 } as Balance;

    transactions.map(trans => {
      balance.income += trans.type === 'income' ? Number(trans.value) : 0
      balance.outcome += trans.type === 'outcome' ? Number(trans.value) : 0
    })
    balance.total = balance.income - balance.outcome
    return balance
  }
}

export default TransactionsRepository;
