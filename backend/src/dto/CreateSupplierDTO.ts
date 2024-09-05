import { IsString, IsBoolean, IsInt, IsNotEmpty, IsArray, IsJSON, ValidateNested } from 'class-validator';

export class CreateSupplierDTO {
  @IsString()
  @IsNotEmpty()
  SupplierName!: string;

  @IsBoolean()
  @IsNotEmpty()
  IsVisible!: boolean;

  @IsInt()
  @IsNotEmpty()
  CreateBy!: number;

  @IsJSON()
  @IsNotEmpty()
  Attributes!: object[];

  @IsJSON()
  @IsNotEmpty()
  Answer!: object;
}

export class EditSupplierDTO extends CreateSupplierDTO {
  @IsInt()
  @IsNotEmpty()
  SupplierID!: number;
}