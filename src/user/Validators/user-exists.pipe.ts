import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { UserService } from '../user.service'; // Import UserService to query the database

@Injectable()
export class UserExistsPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const userId = value;

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new BadRequestException(`User with ID ${userId} does not exist.`);
    }

    return value; 
  }
}
