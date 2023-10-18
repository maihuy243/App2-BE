import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() body: AuthDto) {
    return this.auth.register(body);
  }

  @Post('login')
  login(@Body() body: AuthDto) {
    return this.auth.login(body);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile() {
    return this.auth.getProfile();
  }
}
