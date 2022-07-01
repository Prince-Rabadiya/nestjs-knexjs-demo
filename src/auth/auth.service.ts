import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth-user.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneWithEmail(email);

    // Logger.log('===========log')
    // Logger.warn('===========warn')
    // Logger.error('something went wrong!!!!!!', user)
 
    if (user && user['password'] === password) {
      return user;
    }
    return null;
  }

  async login(authUserDto: AuthUserDto) {
    const user = await this.knex.table('users').where({ email: authUserDto.email, password: authUserDto.password });
    if (user[0] !== undefined) {
      const payload = { email: user[0].email, id: user[0].id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }else{
      return "Wrong email or password!!!"
    }
  }
}
