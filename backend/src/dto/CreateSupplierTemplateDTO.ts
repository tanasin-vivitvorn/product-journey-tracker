import { IsJSON, IsBoolean, IsNotEmpty, IsInt } from 'class-validator';

export class CreateSupplierTemplateDTO {
  @IsJSON()
  @IsNotEmpty()
  FieldTemplate!: object;

  @IsBoolean()
  @IsNotEmpty()
  IsActive!: boolean;

  @IsInt()
  @IsNotEmpty()
  CreateBy!: number;
}
