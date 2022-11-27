import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IUserService } from 'src/users/interfaces/user.service.interface';
import { CreateUserDTO } from 'src/users/user.dto';
import { Logger } from 'winston';
import { IAuthService } from './interfaces/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  userService: IUserService;

  constructor(
    @Inject('IUserService') userService: IUserService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
  ) {
    this.userService = userService;
  }

  async login(createUserDTO: CreateUserDTO): Promise<string> {
    // check user in DB
    // match passwords
    // generate JWT
    this.logger.info(process.env.JWT_SECRET);
    return 'token';
  }

  async register(createUserDTO: CreateUserDTO): Promise<void> {
    const user = await this.userService.getUserByEmail(createUserDTO.email);
    if (user) {
      throw new BadRequestException('Username already exists!');
    }
    // TODO: hash the password
    await this.userService.createUser(createUserDTO);
  }
}
