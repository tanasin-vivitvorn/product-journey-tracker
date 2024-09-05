import { IsInt, IsString, IsNotEmpty, IsJSON } from 'class-validator';

export class CreateSupplierAttributeDTO {
  @IsInt()
  @IsNotEmpty()
  SupplierID!: number;

  @IsJSON()
  @IsNotEmpty()
  FieldTemplate!: object;

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
