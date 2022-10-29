import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from '../dto/user.dto';
import { WsAction } from '@drozd/nestjs-ws-api/ws.decorator';

const NAMESPACE = 'app';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  @WsAction(NAMESPACE)
  getUser(@Param('id', ParseIntPipe) id: number): UserDto {
    return this.appService.getUser(id);
  }
}
