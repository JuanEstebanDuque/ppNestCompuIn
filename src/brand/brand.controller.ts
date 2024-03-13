import { BrandService } from './brand.service';
import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brand')
export class BrandController {

    constructor (

        private readonly BrandService: BrandService

    ){}

    @Get()
    findAll(): any {
        return this.BrandService.findAll();
    }

    @Post()
    @HttpCode(201)
    create(@Body() brand: CreateBrandDto): Brand {
        
        console.log(brand);
        return this.BrandService.create(brand);

    }

    @Put(":id")
    update(@Param("id", ParseUUIDPipe) id: string, @Body() brand: UpdateBrandDto): Brand {
        
        return this.BrandService.update(id, brand);

    }

    @Delete(":id")
    delete(@Param("id", ParseUUIDPipe) id: string): any {
        
        console.log(id);
        return this.BrandService.delete(id);

    }

    @Get("test")
    test(): string {
        return  "Testing the server"
    }

    @Get(":id")
    findById(@Param("id", ParseUUIDPipe) id: string): any {
        
        return this.BrandService.findOneById(id);

    }

}
