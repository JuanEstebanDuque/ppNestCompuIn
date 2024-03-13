import { IsOptional, IsString, IsUUID } from "class-validator";


export class UpdateBrandDto {

    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly name?: string;

}