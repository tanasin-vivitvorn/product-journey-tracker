import { IsInt, IsJSON, IsNotEmpty } from 'class-validator';

export class CreateProductJourneyTemplateDTO {
  @IsInt()
  @IsNotEmpty()
  ProductJourneyID!: number;

  @IsJSON()
  @IsNotEmpty()
  FieldTemplate!: object;

  @IsInt()
  @IsNotEmpty()
  CreateBy!: number;
}
