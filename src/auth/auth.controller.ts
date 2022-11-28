import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { CurrentUser } from 'src/users/user.decorator';
import { CreateUserDTO, UserDTO } from 'src/users/user.dto';
import { AuthGuard } from './auth.guard';
import { IAuthService } from './interfaces/auth.service.interface';

@Controller('auth')
export class AuthController {
  authService: IAuthService;

  constructor(@Inject('IAuthService') authService: IAuthService) {
    this.authService = authService;
  }

  @Post('/login')
  async login(@Body() createUserDTO: CreateUserDTO, @Res() res: Response) {
    const response = await this.authService.login(createUserDTO);
    res.cookie('token', response.token).sendStatus(200);
  }

  @Post('/register')
  register(@Body() createUserDTO: CreateUserDTO) {
    return this.authService.register(createUserDTO);
  }

  // sample route to show cookies working
  @UseGuards(AuthGuard)
  @Get('/current')
  getCurrentClaims(@CurrentUser() user: UserDTO) {
    return user;
  }

  @Get('/logout')
  logout(@Res() res: Response) {
    res.clearCookie('token').send();
  }
}
