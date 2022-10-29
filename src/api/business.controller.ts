import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WsAction } from '@drozd/nestjs-ws-api/ws.decorator';
import { ResultDto } from '../dto/result.dto';
import { CreateUserDto } from '../dto/create-user.dto';

const NAMESPACE = 'business';

@Controller(NAMESPACE)
@ApiTags(NAMESPACE)
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
