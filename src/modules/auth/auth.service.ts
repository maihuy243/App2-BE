import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HttpRespone } from 'src/config/base-respone.config';
import { AuthDto } from 'src/dto/auth.dto';
import { AuthRepo } from 'src/repositories/auth.repository';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { constant_jwt } from 'src/config/constant-jwt';

@Injectable()
export class AuthService {
  constructor(
    private authRepo: AuthRepo,
    private config: ConfigService,
    private jwt: JwtService,
    @Inject(REQUEST) private request: any,
  ) {}

  async register(body: AuthDto) {
    const checkExist = await this.authRepo.findAccount(
      'username',
      body.username,
    );
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

    const isMatch = bcrypt.compareSync(body.password, findAcc?.hashPass || '');

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
      role: findAcc.role,
    };

    const token = await this.jwt.signAsync(payloadGenToken, {
      expiresIn: constant_jwt.expresIn,
    });

    const refresToken = await this.jwt.signAsync(payloadGenToken, {
      expiresIn: constant_jwt.refresh_expresIn,
    });

    return new HttpRespone().build({
      message: 'login success',
      data: {
        token: token,
        refresToken: refresToken,
      },
    });
  }

  async getProfile() {
    const { user } = this.request;
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
