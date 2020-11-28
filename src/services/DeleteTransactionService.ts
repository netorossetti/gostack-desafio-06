import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

interface Request {
  id: string
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    // Verificar id
    const transctionRepository = getRepository(Transaction)

    const transaction = await transctionRepository.findOne(id)
    if (!transaction) {
      throw new AppError("Transação inválida.", 400)
    }
    transctionRepository.remove(transaction)
  }
}

export default DeleteTransactionService;
