import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as bcrypt from 'bcrypt';
import { IUserService } from 'src/users/interfaces/user.service.interface';
import { CreateUserDTO, UserDTO } from 'src/users/user.dto';
import { Logger } from 'winston';
import { IAuthService } from './interfaces/auth.service.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './auth.dto';
import { User } from 'src/users/user.entity';
import { authErrors } from './auth.constants';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserService') private userService: IUserService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private readonly jwtService: JwtService
  ) {}

  async login(createUserDTO: CreateUserDTO): Promise<LoginResponse> {
    const user = await this.userService.getUserByEmail(createUserDTO.email);
    if (!user) {
      this.logger.error(`Login failed for ${createUserDTO.email}`);
      throw new BadRequestException(authErrors.USERNAME_ALREADY_EXISTS);
    }
    const result: boolean = await bcrypt.compare(
      createUserDTO.password,
      user.password
    );
    if (!result) {
      this.logger.error(`Login failed for ${createUserDTO.email}`);
      throw new UnauthorizedException(authErrors.USER_PASSWORD_MISMATCH);
    }
    const payload = { username: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload)
    };
  }

  async register(createUserDTO: CreateUserDTO): Promise<void> {
    const user = await this.userService.getUserByEmail(createUserDTO.email);
    if (user) {
      this.logger.error(`Regsiter failed for ${createUserDTO.email}`);
      throw new BadRequestException(authErrors.USERNAME_ALREADY_EXISTS);
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));

    const hashedPassword = await bcrypt.hash(createUserDTO.password, salt);
    await this.userService.createUser({
      ...createUserDTO,
      password: hashedPassword,
      salt
    });
  }

  async getCurrentClaims(token: string): Promise<UserDTO> {
    const decoded: any = await this.jwtService.decode(token);
    const user: User = await this.userService.getUserByEmail(decoded.username);
    return {
      email: user.email
    };
  }
}
