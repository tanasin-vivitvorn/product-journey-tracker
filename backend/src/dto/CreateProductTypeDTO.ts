import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateProductTypeDTO {
  @IsString()
  @IsNotEmpty()
  ProductTypeName!: string;

  @IsInt()
  @IsNotEmpty()
  CreateBy!: number;
}
