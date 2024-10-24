import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from '../warehouses/warehouse.entity';
import { Staff } from '../staffs/staff.entity';
import { Customer } from '../customers/customer.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Warehouse]),
        TypeOrmModule.forFeature([Staff]),
        TypeOrmModule.forFeature([Customer]),
    ],
    controllers: [FilesController],
    providers: [FilesService],
})
export class FilesModule {}
