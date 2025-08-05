import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const existingUser = await this.userRepository.findOneBy({
      email: data.email,
    });

    if (existingUser) {
      throw new BadRequestException('Email indisponivel!');
    }
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    this.checkingId(id, 'busca por id');
    return this.userRepository.findOneBy({ id });
  }
  update(id: number, data: UpdateUserDto) {
    this.checkingId(id, 'edição');
    return this.userRepository.update(id, data);
  }

  remove(id: number) {
    this.checkingId(id, 'excusão');
    return this.userRepository.delete(id);
  }

  checkingId(id: number, operation: string) {
    if (id === null) {
      throw new BadRequestException(
        `O ID é obrigatório na operação de ${operation}`,
      );
    }
  }
}
