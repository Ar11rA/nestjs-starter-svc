import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/users/user.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
const hashedPassword = bcrypt.hashSync('pass1234', salt);

const userServiceMock = {
  getUserByEmail: (email) => {
    if (email == 'qwe@mail.com') {
      return Promise.resolve(null);
    }
    return Promise.resolve({
      email: 'abc@mail.com',
      password: hashedPassword
    });
  },
  createUser: (user: CreateUserDTO) => Promise.resolve([])
};

const loggerMock = {
  info: (msg: string) => {},
  error: (msg: string) => {}
};

const jwtServiceMock = {
  sign: (payload: any) => 'abcdefghi',
  decode: (token: string) => Promise.resolve([])
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'IUserService',
          useValue: userServiceMock
        },
        {
          provide: 'winston',
          useValue: loggerMock
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('login', () => {
    it('should be able to return token on successful login', async () => {
      const response = await service.login({
        email: 'abc@mail.com',
        password: 'pass1234',
        salt: ''
      });
      expect(response.token).toBe('abcdefghi');
    });
    it('should be throw error when user not found', async () => {
      await expect(() =>
        service.login({
          email: 'qwe@mail.com',
          password: 'pass1234',
          salt: ''
        })
      ).rejects.toThrow(BadRequestException);
    });
    it('should be able to return token on successful login', async () => {
      await expect(
        service.login({
          email: 'abc@mail.com',
          password: 'pass1235',
          salt: ''
        })
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
