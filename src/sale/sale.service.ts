import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Sale } from './entity/sale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSaleDto } from './dtos/create-sale.dto';
import { SaleItem } from 'src/sale-item/entity/sale-item.entity';

@Injectable()
export class SaleService {
  @InjectRepository(Sale)
  private repository: Repository<Sale>;

  //   async createSale(data: CreateSaleDto) {
  //     this.checkCreateEntity(data);

  //     for (const item of data.items) {
  //       if (item?.unitPrice <= 0 || item?.quantity <= 0) {
  //         throw new BadRequestException(
  //           'Preço e quantidade dos itens devem ser maiores que zero.',
  //         );
  //       }
  //     }
  //     const total = data.items.reduce((sum, item) => {
  //       return sum + item.unitPrice * item.quantity;
  //     }, 0);

  //     const entity: Sale = this.repository.create(data);
  //     entity.total = total;

  //     return await this.repository.save(entity);
  //   }
  async createSale(data: CreateSaleDto) {
    this.checkCreateEntity(data);

    const sale = new Sale();
    sale.userId = data.userId;
    sale.paymentMethodId = data.paymentMethodId;
    sale.observation = data.observation ?? '';

    const items: SaleItem[] = data.items.map((itemData) => {
      const item = new SaleItem();
      item.productId = itemData.productId;
      item.quantity = itemData.quantity;
      item.unitPrice = itemData.unitPrice;
      item.total = item.unitPrice * item.quantity;
      return item;
    });

    // Calcula o total da venda
    const total = items.reduce((sum, item) => sum + item.total, 0);

    sale.items = items;
    sale.total = total;

    return await this.repository.save(sale); // salva tudo com cascade
  }
  async findById(id: number) {
    this.checkId(id, 'busca por id');
    const data: Sale | null = await this.repository.findOneBy({ id });

    if (data === null) {
      throw new EntityNotFoundError(Sale, id);
    }
    return data;
  }

  async findAll(): Promise<Sale[]> {
    const data = await this.repository.find();
    if (!data || data.length === 0) {
      throw new NotFoundException('Não existem vendas no sistema.');
    }
    return data;
  }

  checkCreateEntity(data: CreateSaleDto) {
    if (data?.items?.length === 0)
      throw new BadRequestException('A venda deve conter pelo menos um item.');

    if (data?.paymentMethodId === null)
      throw new BadRequestException(
        'A venda precisa de uma forma de pagamento',
      );
    if (data?.userId === null)
      throw new BadRequestException('A venda precisa ter um cliente');
  }
  checkId(id: number, operation: string) {
    if (id === 0)
      throw new BadRequestException(
        'Necessário informar um ID para a operação ',
        operation,
      );
  }
}
