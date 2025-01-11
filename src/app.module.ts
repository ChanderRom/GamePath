import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { VideogamesModule } from './videogames/videogames.module';
// import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-gameshelf'),
    VideogamesModule,
    AuthModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { } 
