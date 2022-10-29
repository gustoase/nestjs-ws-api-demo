import { Body, Controller, Post } from '@nestjs/common';
import { ResultDto } from '../dto/result.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { WsAction } from '@drozd/nestjs-ws-api';

const NAMESPACE = 'business';

@Controller(NAMESPACE)
export class BusinessController {
  @Post('/create')
  @WsAction(NAMESPACE, {
    type: 'body',
    metatype: CreateUserDto,
  })
  async createUser(@Body() userDto: CreateUserDto): Promise<ResultDto> {
    console.log(userDto);

    const result = new ResultDto();
    result.status = 'success';

    return result;
  }
}
