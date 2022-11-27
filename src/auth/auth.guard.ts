import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (!request.cookies.token) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
