import { Controller, Get, Param } from '@nestjs/common';
import { VideogamesService } from './videogames.service';

@Controller('videogames')
export class VideogamesController {
  constructor(private readonly videogamesService: VideogamesService) { }

  @Get()
  async getGames() {
    const games = await this.videogamesService.fetchGames();
  }

  @Get('id/:id')
  async findGameById(@Param('id') id: string) {
    return this.videogamesService.fetchGameById(id);
  }

  @Get('name/:name')
  async fetchGameByName(@Param('name') name: string) {
    return this.videogamesService.fetchGameByName(name);
  }
}
