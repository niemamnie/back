import {TableTennisGameController} from '../../../controllers';
import {GamePlayerRepository, PlayerRepository, TabletennisGameRepository} from '../../../repositories';
import {TabletennisGameService} from '../../../services';
import {testdb} from '../datasources/testdb.datasource';

const map = new Map<(new (...args: any) => any), Object>();


export function getDep<T>(type: new (...args: any) => T): T {
  if (map.has(type))
    return map.get(type) as unknown as T
  else {
    const dep = create(type.name)
    map.set(type, dep)
    return dep as unknown as T
  }

}
function create(typeName: string) {
  switch (typeName) {
    case PlayerRepository.name: return givenPlayerRepository();
    case GamePlayerRepository.name: return givenGamePlayerRepository();
    case TabletennisGameRepository.name: return givenTabletennisGameRepository();
    case TabletennisGameService.name: return givenTabletennisGameService();
    case TableTennisGameController.name: return givenTableTennisGameController();
    default: throw new Error(`${typeName}'s creation in test is not defined`);
  }
}

export function givenPlayerRepository() {
  const repo = new PlayerRepository(testdb);
  return repo;
}

export function givenGamePlayerRepository() {
  const repo = new GamePlayerRepository(testdb, async () => getDep(PlayerRepository));
  return repo
}
export function givenTabletennisGameRepository() {
  const repo = new TabletennisGameRepository(testdb, async () => getDep(GamePlayerRepository));
  return repo;
}
export function givenTabletennisGameService() {
  const service = new TabletennisGameService()
  service['tabletennisGameRepository'] = getDep(TabletennisGameRepository)
  return service;
}


export function givenTableTennisGameController() {
  const controller = new TableTennisGameController(getDep(TabletennisGameService))
  return controller;
}
