import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { v4 as UUID } from 'uuid';

@Injectable()
export class BrandService {

    private brands: Brand[] = [

        {
            id: UUID(),
            name: 'Mercedez Bens'
        },
        {
            id: UUID(),
            name: 'BMW'
        },
        {
            id: UUID(),
            name: 'Mazda'
        },

    ];

    findAll(): any {

        return this.brands;

    }

    findOneById(id: string): Brand {

        const brand: Brand = this.brands.find(brand => brand.id === id)

        if (!brand) {

            throw new NotFoundException(`Car with ID "${id}" not found`);

        }

        return brand;

    }

    create(createBrand: CreateBrandDto): Brand {

        const brand : any = {

            id: UUID(),
            ...createBrand

        }

        this.brands.push(brand);

        return brand;

    }

    update(id: string, updateBrand: UpdateBrandDto): Brand {

        let brand: Brand = this.findOneById(id);

        if (updateBrand.id && updateBrand.id !== id) {

            throw new NotFoundException("Cannot change the ID of a car");

        }

        brand = {

            ...brand,
            ...updateBrand

        }

        this.brands = this.brands.map(b => b.id === id ? brand : b)

        return brand;

    }

    delete(id: string) {

        const index = this.brands.findIndex(brand => brand.id === id);
        
        if (index === -1) {

            throw new NotFoundException(`Brand with ID "${id}" not found`);

        }
        
        this.brands.splice(index, 1);

    }

}