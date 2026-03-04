import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtuaizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}
    //O nest cria o objeto de forma automática e injeta no controller, isso é chamado de injeção de dependência, o controller depende do repository para funcionar, e o nest se encarrega de criar o objeto do repository e injetar no controller.

    @Post()
    async criarUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
        
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.id = uuid();

        this.usuarioRepository.salvar(usuarioEntity);
        return { 
            usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
            menssagem: "Usuário criado com sucesso!" 
        };
    }

    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map(
            usuario => new ListaUsuarioDTO(usuario.id, usuario.nome)
        );
        return usuariosLista;
    }

    @Put('/:id') //essa é a rota para atualizar um usuário, o :id é um parâmetro de rota que representa o id do usuário que queremos atualizar, por exemplo, se quisermos atualizar o usuário com id 123, a rota seria /usuarios/123
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);
        return {
            usuario: usuarioAtualizado,
            menssagem: "Usuário atualizado com sucesso!"
        }

    }

    @Delete('/:id') //essa é a rota para atualizar um usuário, o :id é um parâmetro de rota que representa o id do usuário que queremos atualizar, por exemplo, se quisermos atualizar o usuário com id 123, a rota seria /usuarios/123
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.usuarioRepository.remove(id);
        return {
            usuario: usuarioRemovido,
            menssagem: "Usuário removido com sucesso!"
        }

    }

}