import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    if (!['income', 'outcome'].includes(type)){
      throw new Error("Transaction type is invalid!");
    }

    const {total} = this.transactionRepository.getBalance();
    if (type === "outcome" && total < value) {
      throw new Error("You do not have enough balance.");
    }

    const transaction = this.transactionRepository.create({
      title, value, type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
