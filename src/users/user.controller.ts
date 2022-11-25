import { Body, Controller, Get, Inject, NotFoundException, Param, Post } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { UserDTO } from './user.dto';

@Controller('users')
export class UsersController {

    userService: IUserService;

    constructor(@Inject('IUserService') userService: IUserService) {
        this.userService = userService;
    }

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Post()
    createUser(@Body() user: UserDTO) {
        return this.userService.createUser(user);
    }

    @Get('/:id')
    getUser(@Param('id') id: number) {
        return this.userService.getUser(id);
    }
}
