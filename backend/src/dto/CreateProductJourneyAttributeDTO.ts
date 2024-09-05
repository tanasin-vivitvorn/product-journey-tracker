import { IsInt, IsString, IsNotEmpty, IsJSON, IsBoolean } from 'class-validator';

export class CreateProductJourneyAttributeDTO {
  @IsInt()
  @IsNotEmpty()
  ProductID!: number;

  @IsInt()
  @IsNotEmpty()
  ProductJourneyID!: number;

  @IsJSON()
  @IsNotEmpty()
  FieldTemplate!: object;

  @IsJSON()
  @IsNotEmpty()
  Answer!: object;

  @IsBoolean()
  @IsNotEmpty()
  IsVisible!: boolean;

  @IsInt()
  @IsNotEmpty()
  CreateBy!: number;
}
