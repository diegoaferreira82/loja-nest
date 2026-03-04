import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
})
export class AppModule {}


//As boas práticas pedem para que se criem Modulos separados
//Neste caso existe o app module que importa o Usuario Module que por sua
//vez tem  controller e este importa o repository que contem as funções
//de salvar e listar os usuarios. O app module é o modulo raiz da aplicação
//Cria-se assim uma árvore de módulos, onde o app module é a raiz e os outros módulos são os ramos.