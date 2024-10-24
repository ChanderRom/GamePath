import { Module } from '@nestjs/common';
import { VideogamesService } from './videogames.service';
import { VideogamesController } from './videogames.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [VideogamesController],
  providers: [VideogamesService],
})
export class VideogamesModule { }
