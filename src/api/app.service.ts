import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class AppService {
  getUser(id: number): UserDto {
    const user = new UserDto();
    user.id = id;
    user.email = 'user@mail.com';
    user.firstName = 'user_first_name';

    return user;
  }
}
