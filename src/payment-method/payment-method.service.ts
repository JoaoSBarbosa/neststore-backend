import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entity/paymentMethod.entity';
import { Repository } from 'typeorm';
import { CreatePaymentMethodDto } from './dtos/create-paymentMethod.dto';

@Injectable()
export class PaymentMethodService {
  @InjectRepository(PaymentMethod)
  private repository: Repository<PaymentMethod>;

  createPaymentMethod(dto: CreatePaymentMethodDto) {
    const entity: PaymentMethod = this.repository.create(dto);
    return this.repository.save(entity);
  }

  updatePaymentMethod(id: number, dto: CreatePaymentMethodDto) {
    return this.repository.update(id, dto);
  }

  async findById(id: number) {
    this.checkingId(id, 'busca');

    const entity: PaymentMethod | null = await this.repository.findOneBy({
      id,
    });

    if (entity === null) {
      this.notFoundExecptio(id);
    }
    return entity;
  }

  async findAll(): Promise<PaymentMethod[]> {
    const data = await this.repository.find();
    if (!data || data.length === 0) {
      throw new NotFoundException('Nenhuma forma de pagamento encontrado.');
    }
    return data;
  }

  async remove(id: number) {
    this.checkingId(id, 'deleção');

    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Forma de pagamento com ID ${id} não encontrado para remoção`,
      );
    }
  }

  notFoundExecptio(id: number) {
    throw new NotFoundException(
      `Não foi localizado registro de forma de pagamento com o id informado ${id ? id : ''}`,
    );
  }

  checkingId(id: number, process: string) {
    if (id === null) {
      throw new BadRequestException(
        `É necessario informar o ID para o processo de ${process ? 'de' + process : ''}`,
      );
    }
  }
}
