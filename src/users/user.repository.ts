import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/user.repository.interface';
import { User } from './user.entity';
import { UserDTO } from './user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  async getUsers() {
    const users: User[] = await User.findAll({ raw: true });
    return users.map((user) => {
      const userDTO: UserDTO = {
        name: user.name
      };
      return userDTO;
    });
  }

  async createUser(user: UserDTO) {
    await User.create({
      name: user.name
    });
  }

  async getUser(id: number) {
    const user = await User.findOne({
      where: { id },
      raw: true
    });
    return user ? user.name : null;
  }
}
