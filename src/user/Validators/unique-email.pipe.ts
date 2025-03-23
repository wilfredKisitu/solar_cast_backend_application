import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { UserService } from '../user.service'; // Import your UserService

@Injectable()
export class UniqueEmailPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const email = value.email;

    // Check if the email already exists in the database
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException(`Email ${email} is already in use.`);
    }

    return value;
  }
}
