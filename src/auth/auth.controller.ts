import { Controller, Inject, Post } from '@nestjs/common';
import { IUserService } from 'src/users/interfaces/user.service.interface';

@Controller('auth')
export class AuthController {
  userService: IUserService;

  constructor(@Inject('IUserService') userService: IUserService) {
    this.userService = userService;
  }

  @Post('/login')
  login() {
    return 'TODO';
  }

  @Post('/register')
  register() {
    return 'TODO';
  }
}
