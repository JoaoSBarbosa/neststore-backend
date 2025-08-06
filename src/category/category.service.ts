import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private repository: Repository<Category>;

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.repository.create(createCategoryDto);
    return this.repository.save(category);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    this.checkinId(id, 'busca por id');
    const returnData: Category | null = await this.repository.findOneBy({ id });
    if (returnData === null) {
      this.notFoundException(id, 'Categoria não contrada');
    }
    return returnData;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    this.checkinId(id, 'edição de categoria');
    return this.repository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    this.checkinId(id, 'remoção de categoria');
    const result = await this.repository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(
        `Categoria com ID ${id} não encontrado para remoção`,
      );
  }

  checkinId(id: number, operation: string) {
    if (id === null) {
      throw new BadRequestException(
        `Necessário informar o id para o processo de ${operation}`,
      );
    }
  }
  notFoundException(id: number, message: string) {
    throw new NotFoundException(`ID ${id}: ${message}`);
  }
}
