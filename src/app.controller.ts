import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // O decorador @Controller() é usado para definir uma classe como um controlador em NestJS. Ele pode receber um argumento opcional que especifica o caminho base para as rotas definidas dentro do controlador. Se nenhum argumento for fornecido, o caminho base será a raiz ("/").
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
