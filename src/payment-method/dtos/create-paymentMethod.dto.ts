import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsNotEmpty({ message: 'Necessário informar um tipo de pagamento.' })
  @IsString({ message: 'O tipo de pagamento deve ser uma string.' })
  @MaxLength(50, {
    message: 'O tipo de pagamento deve ter no máximo 50 caracteres.',
  })
  method: string;
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  @MaxLength(255, { message: 'A descrição deve ter no máximo 255 caracteres.' })
  description?: string;
}
