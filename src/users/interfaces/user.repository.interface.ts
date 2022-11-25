import { UserDTO } from "../user.dto"

export interface IUserRepository {
    getUsers(): Promise<UserDTO[]>
    createUser(user: UserDTO): Promise<void>
    getUser(id: number): Promise<string>
}