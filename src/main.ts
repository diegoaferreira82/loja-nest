import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura o pipe de validação global para toda a aplicação. As validaçõese estão no arquivo CriaUsuario.dto.ts
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transforma os dados de entrada para o tipo esperado
      whitelist: true, // remove propriedades que não estão definidas no DTO, ignorando-as
      forbidNonWhitelisted: true, // retorna um erro se houver propriedades que não estão definidas no DTO
    })
  );



useContainer(app.select(AppModule), { fallbackOnErrors: true });



  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
