import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProduct {
  @IsNotEmpty({ message: 'O nome do produto é obrigatório' })
  @IsString({ message: 'O nome do produto deve ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'A descrição do produto é obrigátoria' })
  @IsString({ message: 'A descrição do produto deve ser uma string' })
  description: string;

  @IsNotEmpty({ message: 'O preço do produto é obrigatório.' })
  @IsPositive({ message: 'O preço do produto deve ser maior que zero' })
  @IsNumber({}, { message: 'O preço do produto deve ser um número.' })
  price: number;

  @IsOptional()
  @IsNumber({}, { message: 'O estoque deve ser um número.' })
  stock?: number;

  @IsOptional()
  @IsString({ message: 'A URL da imagem deve ser uma string.' })
  imageUrl?: string;

  @IsNotEmpty({ message: 'A categoria do produto é obrigatório.' })
  @IsNumber({}, { message: 'O ID da categoria deve ser um número.' })
  categoryId: number;
}
