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

    const sumTransactionByType = await getRepository(Transaction)
      .createQueryBuilder("t")
      .select("t.type", "type")
      .addSelect("SUM(t.value)", "sum")
      .groupBy("t.type")
      .getRawMany();

    const balance = <Balance>{ income: 0, outcome: 0, total: 0 }
    sumTransactionByType.map(t => {
      const { type, sum } = t
      balance.income += type === 'income' ? sum : 0
      balance.outcome += type === 'outcome' ? sum : 0
    })
    balance.total = balance.income - balance.outcome
    return balance
  }
}

export default TransactionsRepository;
