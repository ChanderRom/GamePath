import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { VideogamesModule } from './videogames/videogames.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VideogamesModule,
    UsersModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { } 
