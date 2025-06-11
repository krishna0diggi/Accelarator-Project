import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

@Exclude()
export class SubcategoryDto {
  @ApiProperty({ example: "Admin", required: true })
  @Expose()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({ example: "abc.com", required: true })
  @Expose()
  @IsNotEmpty()
  readonly url!: string;

  @ApiProperty({ example: "abc", required: true })
  @Expose()
  @IsNotEmpty()
  readonly title!: string;
  
   @ApiProperty({ example: 1, required: true })
  @Expose()
  @IsNumber()
  readonly categoryId!: number;
  

   @ApiProperty({ example: "abc def", required: true })
  @Expose()
  @IsNotEmpty()
  readonly description!: string;
}
