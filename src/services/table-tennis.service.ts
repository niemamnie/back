import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {TableTennisGame} from '../models';
import {TableTennisRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class TableTennisService {

  constructor(
    @repository(TableTennisRepository) private tableTennisRepository: TableTennisRepository
  ) {
  }

  async createNew() {
    const amount = await this.tableTennisRepository.count();
    const newGame = TableTennisGame.createRandom(amount.count.toString())
    return await this.tableTennisRepository.create(newGame);

  }

  async getById(id: string) {
    return await this.tableTennisRepository.findById(id)
  }


  async getAll() {
    return await this.tableTennisRepository.find();
  }

  async update(gameId: string, changes: TableTennisGame) {
    return await this.tableTennisRepository.updateById(gameId, changes)
  }
}
