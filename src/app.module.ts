import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from './config/dataSource';
import { ApiModule } from './modules/api.module';
import { DelayMiddleWare } from './midleware/delay.middleware';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOption),
    ConfigModule.forRoot(),
    ApiModule,
    JwtModule.register({}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DelayMiddleWare).forRoutes('*');
  }
}
