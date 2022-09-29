import {Getter} from '@loopback/core';
import {TableTennisGameController as GameController} from '../../../controllers';
import {GamePlayerRepository, GameRepository, PlayerRepository} from '../../../repositories';
import {GameService} from '../../../services';
import GamePlayerService from '../../../services/game-player.service';
import {testdb} from '../datasources/testdb.datasource';

const map = new Map<(new (...args: any) => any), Object>();


export function getDep<T>(type: new (...args: any) => T): T {
  if (map.has(type))
    return map.get(type) as unknown as T
  else {
    const dep = {}
    const createdDep = create(type.name)
    map.set(type, createdDep)
    Object.assign(dep, createdDep)
    return createdDep as unknown as T
  }

}
function create(typeName: string) {
  switch (typeName) {
    case PlayerRepository.name: return givenPlayerRepository();
    case GamePlayerRepository.name: return givenGamePlayerRepository();
    case GameRepository.name: return givenGameRepository();
    case GameService.name: return givenTabletennisGameService();
    case GameController.name: return givenGameController();
    case GamePlayerService.name: return givenGamePlayerService();
    default: throw new Error(`${typeName}'s creation in test is not defined`);
  }
}

function givenPlayerRepository() {
  // const gamePlayerRepo = getDep(GamePlayerRepository)
  const repo = new PlayerRepository(testdb);
  return repo;
}

function givenGamePlayerRepository() {
  const playerRepo = getDep(PlayerRepository)
  const repo = new GamePlayerRepository(testdb, Getter.fromValue(playerRepo));
  return repo
}
function givenGameRepository() {
  const repo = new GameRepository(testdb, async () => getDep(GamePlayerRepository));
  return repo;
}
function givenTabletennisGameService() {
  const service = new GameService()
  service['tabletennisGameRepository'] = getDep(GameRepository)
  return service;
}


function givenGameController() {
  const controller = new GameController(getDep(GameService))
  return controller;
}
function givenGamePlayerService() {
  const service = new GamePlayerService(
    getDep(GamePlayerRepository),
    getDep(PlayerRepository),
    getDep(GameRepository)
  );
  return service
}
