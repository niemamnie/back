import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Game,
GamePlayer,
Player,
} from '../models';
import {GameRepository} from '../repositories';

export class GamePlayerController {
  constructor(
    @repository(GameRepository) protected gameRepository: GameRepository,
  ) { }

  @get('/games/{id}/players', {
    responses: {
      '200': {
        description: 'Array of Game has many Player through GamePlayer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Player)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Player>,
  ): Promise<Player[]> {
    return this.gameRepository.players(id).find(filter);
  }

  @post('/games/{id}/players', {
    responses: {
      '200': {
        description: 'create a Player model instance',
        content: {'application/json': {schema: getModelSchemaRef(Player)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Game.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {
            title: 'NewPlayerInGame',
            exclude: ['id'],
          }),
        },
      },
    }) player: Omit<Player, 'id'>,
  ): Promise<Player> {
    return this.gameRepository.players(id).create(player);
  }

  @patch('/games/{id}/players', {
    responses: {
      '200': {
        description: 'Game.Player PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Partial<Player>,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.gameRepository.players(id).patch(player, where);
  }

  @del('/games/{id}/players', {
    responses: {
      '200': {
        description: 'Game.Player DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.gameRepository.players(id).delete(where);
  }
}
