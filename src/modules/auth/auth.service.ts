import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HttpRespone } from 'src/config/base-respone.config';
import { AuthDto } from 'src/dto/auth.dto';
import { AuthRepo } from 'src/repositories/auth.repository';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { Util } from 'src/util/util';

@Injectable()
export class AuthService {
  constructor(
    private authRepo: AuthRepo,
    private config: ConfigService,
    private jwt: JwtService,
    @Inject(REQUEST) private request: any,
    private util: Util,
  ) {}

  async register(body: AuthDto) {
    const checkExist = this.authRepo.findAccount('username', body.username);
    if (checkExist) {
      return new HttpRespone().build({
        statusCode: HttpStatus.FOUND,
        message: 'User exist',
        type: 'error',
      });
    }

    const salt = bcrypt.genSaltSync(Number(this.config.get('SALT_CODE')));

    const user = {
      ...body,
      hashPass: bcrypt.hashSync(body.password, salt),
    };

    try {
      await this.authRepo.save(user);
      return new HttpRespone().build({ message: 'register success' });
    } catch (error) {
      return new HttpRespone().build({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error?.message || error?.error?.message,
        type: 'error',
      });
    }
  }

  async login(body: AuthDto) {
    const findAcc = await this.authRepo.findAccount('username', body.username);

    const isMatch = bcrypt.compareSync(body.password, findAcc?.hashPass);

    if (!findAcc || !isMatch) {
      return new HttpRespone().build({
        statusCode: HttpStatus.FORBIDDEN,
        type: 'error',
        message: 'username , password not correct',
      });
    }

    const payloadGenToken = {
      username: findAcc.username,
      password: findAcc.password,
    };

    const token = await this.jwt.signAsync(JSON.stringify(payloadGenToken), {
      secret: this.config.get('SECRET'),
    });

    return new HttpRespone().build({
      message: 'login success',
      data: {
        token: token,
      },
    });
  }

  async getProfile() {
    const user = this.util.getUserFromHeader(this.request);
    console.log('user', user);

    if (!user) {
      return new HttpRespone().build({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Forbiden resource',
        type: 'error',
      });
    }

    return new HttpRespone().build({
      message: 'success',
      data: {
        username: user.username,
        role: user.role,
      },
    });
  }
}
