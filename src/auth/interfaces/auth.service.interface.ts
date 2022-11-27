import { CreateUserDTO } from "src/users/user.dto";

export interface IAuthService {
  login(createUserDTO: CreateUserDTO): Promise<string>;
  register(createUserDTO: CreateUserDTO): Promise<void>; // TODO: using same DTO, remove depending on use case
}