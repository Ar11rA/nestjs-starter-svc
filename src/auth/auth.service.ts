import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/users/interfaces/user.service.interface';
import { CreateUserDTO } from 'src/users/user.dto';
import { UserService } from 'src/users/user.service';
import { IAuthService } from './interfaces/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  userService: IUserService;

  constructor(@Inject('IUserService') userService: IUserService) {
    this.userService = userService;
  }

  async login(createUserDTO: CreateUserDTO): Promise<string> {
    // check user in DB
    // match passwords
    // generate JWT
    throw new Error('Method not implemented.');
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
