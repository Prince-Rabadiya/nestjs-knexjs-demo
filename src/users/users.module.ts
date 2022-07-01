import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    // JwtModule.register({
    //   secret: 'letsencrypt',
    //   signOptions: { expiresIn: '60s' },
    // }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
