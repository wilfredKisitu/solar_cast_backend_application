import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import { IUser } from './User.Interface/create-user.interface';
import { IUpdateUser } from './User.Interface/update-user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
    ){}

    async findById(id: number) {
      return this.userRepository.findOne({
          where: { id: id },
      });
  }
  

    // create user
    async createUser(user: IUser): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const createdUser = this.userRepository.create({ ...user, password: hashedPassword });
        return this.userRepository.save(createdUser);
    }
    

    // get user by email
    async findByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
      }

      
      //update user 
      async update(id: number, iUpdateUser: IUpdateUser): Promise<IUser> {
        const user = await this.findById(id);
        if (!user) {
          throw new Error('User not found');
        }
        if (iUpdateUser.email) user.email = iUpdateUser.email;
        if (iUpdateUser.password) user.password = iUpdateUser.password;
        return this.userRepository.save(user);
      }

      // delete user
      async delete(id: number): Promise<void> {
        const user = await this.findById(id);
        if (!user) {
          throw new Error(`User with ID ${id} not found`);
        }
        await this.userRepository.delete(id);
      }

      
    // Validate password
    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
 }
