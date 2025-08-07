import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dtos/create-paymentMethod.dto';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly service: PaymentMethodService) {}

  @Post()
  createPaymenthMethod(@Body() data: CreatePaymentMethodDto) {
    return this.service.createPaymentMethod(data);
  }

  @Patch(':id')
  updatePaymenthMethod(
    @Param('id') id: number,
    @Body() data: CreatePaymentMethodDto,
  ) {
    return this.service.updatePaymentMethod(id, data);
  }

  @Delete(':id')
  deletePaymentMethod(@Param('id') id: number) {
    return this.service.remove(id);
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
