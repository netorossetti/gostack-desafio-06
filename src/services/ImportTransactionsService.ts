import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

import fs from 'fs'
import path from 'path'
import uploadConfig from '../config/upload'
import csvParse from 'csv-parse'
import { getRepository, In } from 'typeorm';
import Category from '../models/Category';

interface Request {
  importFileName: string
}

interface CSVTransaction {
  title: string
  type: 'income' | 'outcome'
  value: number
  category: string
}

class ImportTransactionsService {
  async execute({ importFileName }: Request): Promise<Transaction[]> {

    const importFilePath = path.join(uploadConfig.directory, importFileName)

    const importFileExists = await fs.promises.stat(importFilePath)
    if (!importFileExists) { throw new AppError("Falha ao recuperar arquivo de importação", 400) }

    const importsReadStrem = fs.createReadStream(importFilePath)
    const parser = csvParse({ from_line: 2 })

    const transactions: CSVTransaction[] = [];
    const categories: string[] = [];
    const parseCSV = importsReadStrem.pipe(parser)
    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) => cell.trim())
      if (!title || !type || !value) { throw new AppError("arquivo não está no padrão correto", 401) }
      categories.push(category)
      transactions.push({ title, type, value, category })
    })
    await new Promise(resolve => parseCSV.on('end', resolve))



    const categoriesRepository = getRepository(Category)
    const existentCategories = await categoriesRepository.find({ where: { title: In(categories) } })
    const existentCategoriesTitle = existentCategories.map((c: Category) => c.title)

    const addCategoriesTitle = categories
      .filter(category => !existentCategoriesTitle.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index)

    const newCategories = categoriesRepository.create(addCategoriesTitle.map(title => ({ title })))
    await categoriesRepository.save(newCategories);

    // Junção das categorias criadas mais as existentes
    const allImportCategories = [...existentCategories, ...newCategories]
    const transactionsRepository = getRepository(Transaction)
    const newTransactions = transactionsRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: allImportCategories.find(category => category.title === transaction.category)
      }))
    )
    await transactionsRepository.save(newTransactions)
    await fs.promises.unlink(importFilePath)

    return newTransactions
  }
}

export default ImportTransactionsService;