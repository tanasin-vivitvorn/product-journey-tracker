import { IsInt, IsString, IsNotEmpty, IsJSON } from 'class-validator';

export class CreateProductAttributeDTO {
  @IsInt()
  @IsNotEmpty()
  ProductID!: number;

  @IsJSON()
  @IsNotEmpty()
  FieldTemplate!: object;

  @IsJSON()
  @IsNotEmpty()
  Answer!: object;

  @IsString()
  @IsNotEmpty()
  Name!: string;

  @IsString()
  @IsNotEmpty()
  Value!: string;

  @IsInt()
  @IsNotEmpty()
  CreateBy!: number;
}
