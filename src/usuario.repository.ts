import { Get, Post } from "@nestjs/common";

export class UsuarioRepository {
    private usuarios = <string[]>[];

    @Post()
    async salvar(usuario) {
        this.usuarios.push(usuario);
    }   

    @Get()
    async listar() {
        return this.usuarios;
    }
}