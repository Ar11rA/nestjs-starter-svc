import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req
} from '@nestjs/common';
import { Request } from 'express';
import { IUserService } from './interfaces/user.service.interface';
import { CreateUserDTO, UserDTO } from './user.dto';

// Note - Not to be used in production setups, unless admin role added
@Controller('users')
export class UsersController {
  userService: IUserService;

  constructor(@Inject('IUserService') userService: IUserService) {
    this.userService = userService;
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() user: CreateUserDTO) {
    return this.userService.createUser(user);
  }

  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }
}
