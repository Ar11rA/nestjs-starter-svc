import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { IUserRepository } from './interfaces/user.repository.interface';
import { IUserService } from './interfaces/user.service.interface';
import { userErrors } from './user.constants';
import { CreateUserDTO } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService implements IUserService {
  userRepository: IUserRepository;

  constructor(
    @Inject('IUserRepository') userRepository: IUserRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
  ) {
    this.userRepository = userRepository;
  }

  async getUsers() {
    this.logger.info('Fetching users!');
    return await this.userRepository.getUsers();
  }

  async createUser(user: CreateUserDTO) {
    return await this.userRepository.createUser(user);
  }

  async getUser(id: number) {
    const user = await this.userRepository.getUser(id);
    if (!user) {
      throw new NotFoundException(userErrors.USER_NOT_FOUND);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);
    return user;
  }
}
