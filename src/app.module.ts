import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { AppService } from './api/app.service';
import { ConfigModule } from '@nestjs/config';
import { BusinessController } from './api/business.controller';
import validationConfig from './config/validation.config';
import { Socket } from 'socket.io';
// import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { IWsApiConfig, WsModule } from '@drozd/nestjs-ws-api';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WsModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (): IWsApiConfig => {
        return {
          validationConfig,
          async validate(_socket: Socket) {
            // console.log(new ExecutionContextHost([socket]));
            return HttpStatus.OK;
          },
        };
      },
    }),
  ],
  controllers: [AppController, BusinessController],
  providers: [AppService],
})
export class AppModule {}
