import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSaleDto {
  @IsNumber({}, { message: 'ID informado não é numerico' })
  @IsNotEmpty({ message: 'O id do cliente é obrigatório para salvar a venda' })
  userId: number;
}
