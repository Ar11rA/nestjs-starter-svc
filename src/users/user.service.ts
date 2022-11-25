import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "./interfaces/user.repository.interface";
import { IUserService } from "./interfaces/user.service.interface";
import { UserDTO } from "./user.dto";

@Injectable()
export class UserService implements IUserService {

    userRepository: IUserRepository;

    constructor(@Inject('IUserRepository') userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }
    async getUsers() {
        return await this.userRepository.getUsers();
    }
  
    async createUser(user: UserDTO) {
        return await this.userRepository.createUser(user);
    }

    async getUser(id: number) {
        const user = await this.userRepository.getUser(id);
        if (!user) {
            throw new NotFoundException('No user found!');
        }
        return user;
    }
}