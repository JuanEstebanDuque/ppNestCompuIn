import { CarsService } from './cars.service';
import { Controller, Get, Post, HttpCode, Param, Body, ParseIntPipe, Put, Delete, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {

    constructor (

        private readonly CarsService: CarsService

    ){}

    @Get()
    findAll(): any {
        return this.CarsService.findAll();
    }

    @Post()
    @HttpCode(201)
    create(@Body() car: CreateCarDto): Car {
        
        console.log(car);
        return this.CarsService.create(car);

    }

    @Put(":id")
    update(@Param("id", ParseUUIDPipe) id: string, @Body() car: UpdateCarDto): Car {
        
        return this.CarsService.update(id, car);

    }

    @Delete(":id")
    delete(@Param("id", ParseUUIDPipe) id: string): any {
        
        console.log(id);
        return this.CarsService.delete(id);

    }

    @Get("test")
    test(): string {
        return  "Testing the server"
    }

    @Get(":id")
    findById(@Param("id", ParseUUIDPipe) id: string): any {
        
        return this.CarsService.findOneById(id);

    }

    
}