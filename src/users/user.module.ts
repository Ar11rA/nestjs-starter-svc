import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UsersController } from './user.controller';

@Module({
  controllers: [UsersController],
  providers: [{
    useClass: UserService,
    provide: 'IUserService'
  }, {
    useClass: UserRepository,
    provide: 'IUserRepository'
  }],
  exports: [{
    useClass: UserService,
    provide: 'IUserService'
  }],
})
export class UsersModule {}
