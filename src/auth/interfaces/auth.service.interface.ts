import { CreateUserDTO, UserDTO } from 'src/users/user.dto';
import { LoginResponse } from '../auth.dto';

export interface IAuthService {
  login(createUserDTO: CreateUserDTO): Promise<LoginResponse>;
  register(createUserDTO: CreateUserDTO): Promise<void>; // TODO: using same DTO, remove depending on use case
  getCurrentClaims(token: string): Promise<UserDTO>; // TODO: using same DTO, remove depending on use case
}
