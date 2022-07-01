import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: "pg",
          useNullAsDefault: true,
          connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'qwertypg',
            database: 'nest-dev',
          },
        },
      }),
    }),
    CatsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
