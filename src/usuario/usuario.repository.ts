import { Injectable } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios:UsuarioEntity[] = <UsuarioEntity[]>[];

    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
    }   

    async listar() {
        return this.usuarios;
    }

    async existeComEmail(email: string) {
        const possivelUsuario = this.usuarios.find(
            (usuario) => usuario.email === email
        );

        return possivelUsuario !== undefined;
    }

    async atualiza(id: string, novosDados: Partial<UsuarioEntity>) { //Partial faz todos os campos serem opcionais
        const usuario = this.buscaPorId(id);
        
        Object.entries(novosDados).forEach(([chave, valor]) => {
            if (chave === 'id') {
                return;
            }

            usuario[chave] = valor;

        });
        return usuario; 
    }

    private buscaPorId(id: string) {
        const possivelUsuario = this.usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        );
        if (!possivelUsuario) {
            throw new Error('Usuário não encontrado');
        }
        return possivelUsuario;
    }

    async remove(id: string) {
        const usuario = this.buscaPorId(id);
       
        //filtra a lista de usuários, removendo o usuário com o id informado, ou seja, retorna uma nova lista de usuários sem o usuário removido
        this.usuarios = this.usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        );

       return usuario;
    }
}
//Um provider no nest é qualquer classe anotada com @Injectable() que pode ser injetada em outras classes. Ele é responsável por fornecer uma funcionalidade específica, como acessar um banco de dados ou realizar uma operação de negócio. No exemplo acima, o UsuarioRepository é um provider que fornece métodos para salvar e listar usuários. Ele é injetado no UsuarioController para que o controller possa usar esses métodos para manipular os dados dos usuários.