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
    const newGame = TableTennisGame.createRandom()
    return this.tableTennisRepository.create(newGame);
  }

  getById(id: string) {
    return this.tableTennisRepository.findById(id)
  }


  async getAll() {
    return this.tableTennisRepository.find();
  }

  async update(gameId: string, changes: Partial<TableTennisGame>) {
    return this.tableTennisRepository.updateById(gameId, changes)
  }
}
