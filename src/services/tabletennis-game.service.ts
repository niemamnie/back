import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Game} from '../models';
import {GameRepository} from '../repositories';

@injectable({scope: BindingScope.SINGLETON})
export class GameService {
  @repository(GameRepository)
  private tabletennisGameRepository: GameRepository;
  constructor(
  ) {
  }

  async createNew() {
    const newGame = Game.createRandom('random') //TODO add param for gametype
    return this.tabletennisGameRepository.create(newGame);
  }

  getById(id: string) {
    return this.tabletennisGameRepository.findById(id)
  }


  getAll() {
    return this.tabletennisGameRepository.find();
  }

  update(gameId: string, changes: Partial<Game>) {
    return this.tabletennisGameRepository.updateById(gameId, changes)
  }


}
