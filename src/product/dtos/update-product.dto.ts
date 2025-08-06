import { PartialType } from '@nestjs/mapped-types';
import { partition } from 'rxjs';
import { CreateProduct } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProduct) {}
