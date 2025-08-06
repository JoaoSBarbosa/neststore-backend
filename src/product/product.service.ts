import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProduct } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private dao: Repository<Product>;

  create(dto: CreateProduct) {
    const data = this.dao.create(dto);
    return this.dao.save(data);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.dao.find();
    if (!products || products.length === 0) {
      throw new NotFoundException('Nenhum produto encontrado.');
    }
    return products;
  }

  async findById(id: number) {
    this.checkingId(id, 'busca');
    const product = await this.dao.findOneBy({ id });
    if (product === null) {
      this.notFoundExecptio(id);
    }
    return product;
  }

  update(id: number, dto: UpdateProductDto) {
    this.checkingId(id, 'atualização');
    return this.dao.update(id, dto);
  }

  async remove(id: number) {
    this.checkingId(id, 'deleção');
    const result = await this.dao.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Produto com ID ${id} não encontrado para remoção`,
      );
    }
  }
  checkingId(id: number, process: string) {
    if (id === null) {
      throw new BadRequestException(
        `É necessario informar o ID para o processo de ${process ? 'de' + process : ''}`,
      );
    }
  }

  notFoundExecptio(id: number) {
    throw new NotFoundException(
      `Não foi localizado registro de categoria com o id informado ${id ? id : ''}`,
    );
  }
}
