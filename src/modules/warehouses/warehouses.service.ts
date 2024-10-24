import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { CreateWarehouseDTO } from './dto/createWarehouse.dto';
import { omitFields } from '../../common/helper/omit_field.helper';

@Injectable()
export class WarehousesService {
    constructor(
        @InjectRepository(Warehouse)
        private warehouseRepository: Repository<Warehouse>
    ) { };

    async getAll(): Promise<Warehouse[]> {
        const result = await this.warehouseRepository.find({
            where: { isDeleted: false },
        });

        result.forEach((item, index) => {
            result[index] = omitFields(item, ['deletedAt', 'isDeleted']);
        });

        return result;
    };

    async getDetail(id: number): Promise<Warehouse> {
        const result = await this.warehouseRepository.findOne({
            where: { id },
            relations: ['staffs'],
        });

        const isNotDeletedStaffs = result.staffs.filter(staff => !staff.isDeleted);

        const formatResult = {
            ...result,
            staffs: isNotDeletedStaffs.map(staff => ({
                id: staff.id,
                Fullname: staff.Fullname,
                Email: staff.Email,
                PhoneNumber: staff.PhoneNumber,
            })),
        };

        return omitFields(formatResult, ['deletedAt', 'isDeleted']);
    };

    async getByPage(
        page: number,
        limit: number,
    ): Promise<{ data: Warehouse[], total: number }> {
        let [data, total] = await this.warehouseRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            where: { isDeleted: false }
        });

        data = omitFields(data, ['deletedAt', 'isDeleted'])

        return {
            data,
            total,
        };
    };

    async getNewestWarehouse(): Promise<Warehouse> {
        const result = await this.warehouseRepository.find({
            order: { id: 'DESC' },
            take: 1,
        });

        return result[0];
    };

    async getWarehousesDeleted(): Promise<Warehouse[]> {
        const result = await this.warehouseRepository.find({
            where: { isDeleted: true },
        });

        return omitFields(result, ['isDeleted']);
    };

    async getAmount(): Promise<number> {
        const amount = await this.warehouseRepository.findAndCount();

        return amount[1];
    };

    async create(data: CreateWarehouseDTO): Promise<Warehouse> {
        const newWarehouse = new Warehouse();

        newWarehouse.Name = data.Name;
        newWarehouse.Address = data.Address;
        newWarehouse.Latitude = data.Latitude;
        newWarehouse.Longitude = data.Longitude;

        return this.warehouseRepository.save(newWarehouse);
    };

    async update(id: number, data: CreateWarehouseDTO): Promise<Warehouse> {
        const warehouse = await this.warehouseRepository.findOneBy({ id, isDeleted: false });

        warehouse.Name = data.Name;
        warehouse.Address = data.Address;
        warehouse.Latitude = data.Latitude;
        warehouse.Longitude = data.Longitude;

        return this.warehouseRepository.save(warehouse);
    };

    async softDelete(id: number): Promise<Warehouse> {
        const warehouse = await this.warehouseRepository.findOneBy({ id });
        warehouse.isDeleted = true;
        warehouse.deletedAt = new Date();

        return this.warehouseRepository.save(warehouse);
    };

    async restore(id: number): Promise<Warehouse> {
        const warehouse = await this.warehouseRepository.findOneBy({ id });
        warehouse.isDeleted = false;
        warehouse.deletedAt = null;

        return this.warehouseRepository.save(warehouse);
    };
}
