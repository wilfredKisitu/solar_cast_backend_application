import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './User.DTO/create-user.dto';
import { UniqueEmailPipe } from './Validators/unique-email.pipe';
import { UpdateUserDto } from './User.DTO/update-user.dto';
import { UserExistsPipe } from './Validators/user-exists.pipe';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth-guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @UsePipes(UserExistsPipe)
    async getUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.findById(id);
    }


    @Post()
    @UsePipes(UniqueEmailPipe)
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto, );
    } 

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UsePipes(UserExistsPipe)
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto){
        return this.userService.update(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @UsePipes(UserExistsPipe)
    async deleteUser(@Param('id') id:number){
        return this.userService.delete(id)
    }
}
