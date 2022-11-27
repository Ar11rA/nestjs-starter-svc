import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/user.dto';
import { IAuthService } from './interfaces/auth.service.interface';

@Controller('auth')
export class AuthController {
  authService: IAuthService;

  constructor(@Inject('IAuthService') authService: IAuthService) {
    this.authService = authService;
  }

  @Post('/login')
  login(@Body() createUserDTO: CreateUserDTO) {
    return this.authService.login(createUserDTO);
  }

  @Post('/register')
  register(@Body() createUserDTO: CreateUserDTO) {
    return this.authService.register(createUserDTO);
  }
}
