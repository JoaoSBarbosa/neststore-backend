import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleItem } from './entity/sale-item.entity';
import { Repository } from 'typeorm';
import { Sale } from 'src/sale/entity/sale.entity';

@Injectable()
export class SaleItemService {
  @InjectRepository(SaleItem)
  private repository: Repository<SaleItem>;

  async getById(id: number): Promise<SaleItem> {
    this.validateId(id, 'buscar item de venda');

    const entity = await this.repository.findOneBy({ id });
    if (entity === null)
      throw new NotFoundException(
        `Não foi localizado item de venda com o ID informado: ${id}`,
      );

    return entity;
  }

  async getAll(): Promise<SaleItem[]> {
    return await this.repository.find();
  }

  private validateId(id: number, action: string): void {
    if (!id || id <= 0) {
      throw new BadRequestException(`ID inválido para ${action}`);
    }
  }
}
