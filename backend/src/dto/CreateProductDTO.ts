import { IsInt, IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductAttributeDTO } from './CreateProductAttributeDTO';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  ProductName!: string;

  @IsInt()
  @IsNotEmpty()
  ProductTypeID!: number;

  @IsInt()
  @IsNotEmpty()
  SupplierID!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductAttributeDTO)
  attributes!: CreateProductAttributeDTO[];
}
