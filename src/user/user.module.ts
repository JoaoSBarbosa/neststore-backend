import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

/**
 * Integração do módulo de usuários com o TypeORM.
 *
 * O `TypeOrmModule` é responsável por fornecer suporte ao ORM (Object-Relational Mapping) no NestJS,
 * permitindo mapear classes TypeScript para tabelas no banco de dados.
 *
 * O método `forFeature([User])` disponibiliza o repositório da entidade `User` exclusivamente para
 * este módulo (`UserModule`). Isso permite injetar o `Repository<User>` diretamente no `UserService`,
 * promovendo o acesso aos dados da tabela de usuários.
 */

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registra a entidade User para uso neste módulo
  controllers: [UserController], // Define o controller responsável pelas rotas de usuário
  providers: [UserService], // Define o service que contém a lógica de negócio dos usuários
})
export class UserModule {}
