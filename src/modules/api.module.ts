import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModuleOption } from 'src/config/jwt/jwt.module';

@Module({
  imports: [AuthModule, JwtModuleOption],
  controllers: [],
  providers: [],
})
export class ApiModule {}
