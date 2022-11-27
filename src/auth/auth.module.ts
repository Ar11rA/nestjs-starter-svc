import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    {
      useClass: AuthService,
      provide: 'IAuthService'
    }
  ]
})
export class AuthModule {}
