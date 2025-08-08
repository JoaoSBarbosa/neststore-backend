import { Controller, Get, Param } from '@nestjs/common';
import { SaleItemService } from './sale-item.service';

@Controller('sale-item')
export class SaleItemController {
  constructor(private readonly service: SaleItemService) {}

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Get()
  findAll() {
    return this.service.getAll();
  }
}
