import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { v4 as UUID } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [

        {
            id: UUID(),
            brand: 'Audi',
            model: 'A4'
        },
        {
            id: UUID(),
            brand: 'BMW',
            model: '3 Series'
        },
        {
            id: UUID(),
            brand: "Jeep",
            model: "Cherokee"
        }

    ];


    findAll(): any {

        return this.cars;

    }

    findOneById(id: string): Car {

        const car: Car = this.cars.find(car => car.id === id)

        if (!car) {

            throw new NotFoundException(`Car with ID "${id}" not found`);

        }

        return car;

    }

    create(createCar: CreateCarDto): Car {

        const car : any = {

            id: UUID(),
            ...createCar

        }

        this.cars.push(car);

        return car;

    }

    update(id: string, updateCar: UpdateCarDto): Car {

        let car: Car = this.findOneById(id);

        if (updateCar.id && updateCar.id !== id) {

            throw new NotFoundException("Cannot change the ID of a car");

        }

        car = {

            ...car,
            ...updateCar

        }

        this.cars = this.cars.map(c => c.id === id ? car : c)

        return car;

    }

    delete(id: string) {

        const index = this.cars.findIndex(car => car.id === id);
        
        if (index === -1) {

            throw new NotFoundException(`Car with ID "${id}" not found`);

        }
        
        this.cars.splice(index, 1);

    }

}
