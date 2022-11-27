import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  Session,
  UseGuards
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDTO } from 'src/users/user.dto';
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
    res.cookie('token', response.token);
    res.send('ok');
  }

  @Post('/register')
  register(@Body() createUserDTO: CreateUserDTO) {
    return this.authService.register(createUserDTO);
  }

  // sample route to show cookies working
  @UseGuards(AuthGuard)
  @Get('/current')
  getCurrentClaims(@Req() request: Request) {
    return this.authService.getCurrentClaims(request.cookies.token);
  }

  @Get('/logout')
  logout(@Res() res: Response) {
    res.clearCookie('token').send();
  }
}
