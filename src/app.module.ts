import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from './config/dataSource';
import { ApiModule } from './modules/api.module';
import { DelayMiddleWare } from './midleware/delay.middleware';
import { ConfigModule } from '@nestjs/config';
import { JwtModuleOption } from './config/jwt/jwt.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOption),
    ConfigModule.forRoot(),
    ApiModule,
    JwtModuleOption,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DelayMiddleWare).forRoutes('*');
  }
}
