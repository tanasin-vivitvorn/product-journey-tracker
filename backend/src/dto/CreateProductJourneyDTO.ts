import { IsInt, IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateProductJourneyDTO {
  @IsInt()
  @IsNotEmpty()
  ProductTypeID!: number;

  @IsString()
  @IsNotEmpty()
  ProductJourneyName!: string;

  @IsString()
  @IsNotEmpty()
  ProductJourneyDescription!: string;

  @IsInt()
  @IsNotEmpty()
  ProductJourneyIndex!: number;

  @IsString()
  @IsNotEmpty()
  DefaultMessageTemplate!: string;

  @IsBoolean()
  @IsNotEmpty()
  IsVisible!: boolean;

  @IsInt()
  @IsNotEmpty()
  CreateBy!: number;
}
