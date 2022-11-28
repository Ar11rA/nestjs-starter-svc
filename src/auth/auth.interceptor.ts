import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/users/user.dto';
import { IAuthService } from './interfaces/auth.service.interface';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(@Inject('IAuthService') private authService: IAuthService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { token } = request.cookies || {};
    if (token) {
      const user: UserDTO = await this.authService.getCurrentClaims(token);
      request.CurrentUser = user;
    }
    return next.handle();
  }
}
