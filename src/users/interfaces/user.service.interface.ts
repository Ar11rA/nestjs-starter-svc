import { CreateUserDTO, UserDTO } from '../user.dto';
import { User } from '../user.entity';

export interface IUserService {
  getUsers(): Promise<UserDTO[]>;
  createUser(user: CreateUserDTO): Promise<void>;
  getUser(id: number): Promise<string>;
  getUserByEmail(email: string): Promise<User>;
}
