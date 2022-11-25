import { UserDTO } from "../user.dto"
import { User } from "../user.entity"

export interface IUserService {
    getUsers(): Promise<UserDTO[]>
    createUser(user: UserDTO): Promise<void>
    getUser(id: number): Promise<string>
}