import { IsInt, IsJSON, IsNotEmpty } from 'class-validator';

export class CreateProductTemplateDTO {
  @IsInt()
  @IsNotEmpty()
  ProductTypeID!: number;

  @IsJSON()
  @IsNotEmpty()
  FieldTemplate!: object;

  @IsInt()
  @IsNotEmpty()
  CreateBy!: number;
}
