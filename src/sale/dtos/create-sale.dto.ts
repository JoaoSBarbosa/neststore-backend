import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateSaleItem } from 'src/sale-item/dtos/create-sale-item.dto';

export class CreateSaleDto {
  @IsNumber({}, { message: 'O ID do usuário deve ser numérico.' })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório.' })
  userId: number;

  @IsNumber({}, { message: 'O ID da forma de pagamento deve ser numérico.' })
  @IsNotEmpty({ message: 'A forma de pagamento é obrigatória.' })
  paymentMethodId: number;

  @IsOptional()
  @IsString({ message: 'A observação deve ser uma string.' })
  @MaxLength(255, {
    message: 'A observação deve ter no máximo 255 caracteres.',
  })
  observation?: string;

  @IsArray({ message: 'A lista de itens deve ser um array' })
  @ValidateNested({ each: true })
  @Type(() => CreateSaleItem)
  items: CreateSaleItem[];
}
