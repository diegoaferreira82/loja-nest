import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

export class CriaUsuarioDTO {

    //Dá para personalizar as mensagens de erro abrindo um objeto com as propriedades de validação, por exemplo:
    // @IsString({ message: 'O nome deve ser uma string' })
    @IsString() //Valida que o campo seja do tipo string
    @IsNotEmpty({ message: 'O nome não pode ser vazio' }) //Valida que o campo não seja vazio
    nome: string;

    @IsEmail(undefined, { message: 'O email deve ser um email válido' }) //Valida que o campo seja do tipo email
    @EmailEhUnico({ message: 'O email já está em uso' }) //Valida que o email seja único, ou seja, que não exista outro usuário com o mesmo email
    email: string;

    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' }) //Valida que o campo tenha no mínimo 6 caracteres
    senha: string;
}

//O DTO (Data Transfer Object) é um padrão de projeto que tem como objetivo transportar dados entre processos, ele é usado para definir a estrutura dos dados que serão enviados e recebidos pela aplicação. No exemplo acima, o CriaUsuarioDTO é um DTO que define a estrutura dos dados que serão enviados para criar um novo usuário, ele tem as propriedades nome, email e senha. O DTO é usado para garantir que os dados enviados para a aplicação estejam no formato correto e para facilitar a validação dos dados.
//npm install class-validator class-transformer  inslala as dependencias do Nest.js para validação de dados, o class-validator é usado para validar os dados recebidos e o class-transformer é usado para transformar os dados recebidos em objetos do tipo DTO. Com essas dependências instaladas, podemos usar as decorators do class-validator para validar os dados recebidos no DTO, por exemplo:

//Para criar a validação de email foi feito:
//1. Criou um decorator
//2. Usou ele no CriaUsuarioDTO
//3. Criou a classe para validação
//4. Registrou a classe de validação como provider no módulo do usuário
//5. Adicionou o provider do validator no módulo do usuário