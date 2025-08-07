import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sale } from './entity/sale.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SaleService {
  @InjectRepository(Sale)
  private repository: Repository<Sale>;

  createSale() {}
}
