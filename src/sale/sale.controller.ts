import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dtos/create-sale.dto';

@Controller('sale')
export class SaleController {
  constructor(private readonly service: SaleService) {}

  @Post()
  createSale(@Body() data: CreateSaleDto) {
    return this.service.createSale(data);
  }

  @Get(':id')
  findBydId(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
