import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/user.repository.interface';
import { User } from './user.entity';
import { UserDTO, CreateUserDTO } from './user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  async getUsers() {
    const users: User[] = await User.findAll({ raw: true });
    return users.map((user) => {
      const userDTO: UserDTO = {
        email: user.email
      };
      return userDTO;
    });
  }

  async createUser(user: CreateUserDTO) {
    await User.create({
      email: user.email,
      password: user.password
    });
  }

  async getUser(id: number) {
    const user = await User.findOne({
      where: { id },
      raw: true
    });
    return user ? user.email : null;
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({
      where: { email },
      raw: true
    });
    return user;
  }
}
