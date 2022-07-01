import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserDto } from '../auth/dto/auth-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.email && createUserDto.password) 
      return this.usersService.create(createUserDto);
    else
      throw new HttpException("email and password are required!!!", HttpStatus.FORBIDDEN);
    
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('auth')
  @UseGuards(JwtAuthGuard)
  auth(@Body() authUserDto: AuthUserDto) {
    if (authUserDto.email && authUserDto.password) 
      return this.usersService.auth(authUserDto);
    else
      throw new HttpException("email and password are required!!!", HttpStatus.FORBIDDEN);
  }
}
