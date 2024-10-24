import { Staff } from './staff.entity';
import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffsController } from './staffs.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Staff])],
    controllers: [StaffsController],
    providers: [StaffsService],
    exports: [StaffsService],
})
export class StaffsModule { }
