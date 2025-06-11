import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

@Exclude()
export class CategoryDto{
    @ApiProperty({example: 'abc', required: true})
    @Expose()
    @IsNotEmpty()
    readonly name!:string;
}
