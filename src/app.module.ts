import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { UsersController } from './users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';

// .forRoot("mongodb://[username]:[password]@localhost:[port]/[database-name]")
//mongodb://localhost/nestjs ,,, is fine

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/nestjs'),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('users'); // Option No 1

    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'users', method: RequestMethod.POST }); // Option No 2, with specified method

    consumer.apply(LoggerMiddleware).forRoutes(UsersController); // Option No 3, with specified controller
  }
}
