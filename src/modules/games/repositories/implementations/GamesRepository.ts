import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder("games")
      .where("games.title ILIKE :title ", { title: `%${param}%` })
      .getMany();

    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query("SELECT COUNT(*) FROM users"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const game = await this.repository
      .createQueryBuilder("games")
      .leftJoinAndSelect("games.users", "users")
      .getOne();

    // Complete usando query builder
    const users: User[] | undefined = game?.users;

    if (!users) {
      return [];
    }

    return users;
  }
}
