import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RicePlant } from './riceplant.entity';
import { Repository } from 'typeorm';
import { omitFields } from 'src/common/helper/omit_field.helper';

@Injectable()
export class RiceplantsService {
    constructor(
        @InjectRepository(RicePlant)
        private ricePlantRepository: Repository<RicePlant>,
    ) { };

    async getAll(): Promise<RicePlant[]> {
        let ricePlants = await this.ricePlantRepository.find();

        ricePlants.forEach((item, index) => {
            ricePlants[index] = omitFields(item, ['isDeleted', 'deletedAt']);
        });

        return ricePlants;
    };

    async getByPage(page: number, limit: number): Promise<RicePlant[]> {
        const offset = (page - 1) * limit;

        let ricePlants = await this.ricePlantRepository.find({
            take: limit,
            skip: offset,
        });

        ricePlants.forEach((item, index) => {
            ricePlants[index] = omitFields(item, ['isDeleted', 'deletedAt']);
        });

        return ricePlants;
    };
}
