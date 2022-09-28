import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {TabletennisGame} from '../models';
import {TabletennisGameRepository} from '../repositories';

@injectable({scope: BindingScope.SINGLETON})
export class TabletennisGameService {
  @repository(TabletennisGameRepository)
  private tabletennisGameRepository: TabletennisGameRepository;
  constructor(
  ) {
  }

  async createNew() {
    const newGame = TabletennisGame.createRandom()
    return this.tabletennisGameRepository.create(newGame);
  }

  getById(id: string) {
    return this.tabletennisGameRepository.findById(id)
  }


  async getAll() {
    return this.tabletennisGameRepository.find();
  }

  async update(gameId: string, changes: Partial<TabletennisGame>) {
    return this.tabletennisGameRepository.updateById(gameId, changes)
  }

  create(newGame: Partial<TabletennisGame>) {
    return this.tabletennisGameRepository.create(newGame);
  }



  getNewIdForGame(gameId: string) {

  }
}
