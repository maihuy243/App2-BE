import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModuleOption } from 'src/config/jwt/jwt.module';
import { ExportModule } from './export/export.module';
import { MartModule } from './mart/mart.module';

@Module({
  imports: [AuthModule, JwtModuleOption, ExportModule, MartModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
