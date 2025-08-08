import { IsNumber, IsPositive } from 'class-validator';

export class CreateSaleItem {
  @IsNumber({}, { message: ' O ID do produto deve ser um número.' })
  @IsPositive({ message: ' O ID do produto deve ser maior que zero.' })
  productId: number;

  @IsNumber({}, { message: ' A quantidade deve ser um número.' })
  @IsPositive({ message: 'A quantidade deve ser maior que zero.' })
  quantity: number;

  @IsNumber({}, { message: 'O preço unitário deve ser um número.' })
  @IsPositive({ message: 'O preço unitário deve ser maior que zero.' })
  unitPrice: number;
}
