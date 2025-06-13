import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

@Exclude()
export class CategoryDto {
  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ example: "abc", required: true })
  @Expose()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({ example: true, required: true })
  @Expose()
  @IsNotEmpty()
  readonly status!: boolean;
}
