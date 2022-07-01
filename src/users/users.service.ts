import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserDto } from '../auth/dto/auth-user.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
// import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    // private readonly authService: AuthService,
    // private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // if (!await this.knex.schema.hasTable('users')) {
    //   await this.knex.schema.createTable('users', table => {
    //     table.increments('id').primary();
    //     table.string('name');
    //     table.string('email');
    //     table.string('password');
    //   });
    // }

    await this.knex.table('users').insert(createUserDto);
    const users = await this.knex.table('users');
    return { users };
  }

  async findAll() {
    const users = await this.knex.table('users');
    return { users };
  }

  async findOne(id: number) {
    const user = await this.knex.table('users').where('id', id);
    return { user };
  }

  async findOneWithEmail(email: string) {
    const user = await this.knex.table('users').where('email', email);
    return user[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.knex.table('users').where('id', id).update(updateUserDto);
    const user = await this.knex.table('users').where('id', id);
    return { user };
  }

  async remove(id: number) {
    const user = await this.knex.table('users').where('id', id);
    if (user[0] !== undefined) {
      await this.knex.table('users').del().where('id', id);
      return "User deleted successfully.";
    }
    return "User not found!!!";
  }

  async auth(authUserDto: AuthUserDto) {
    const user = await this.knex.table('users').where({ email: authUserDto.email, password: authUserDto.password });
    if (user[0] !== undefined) {
      const payload = { email: user[0].email, sub: user[0].id };
      return "success"
        // access_token: this.jwtService.sign(payload),
    }else{
      return "Wrong email or password!!!"
    }
  }
}
