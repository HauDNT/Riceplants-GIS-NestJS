import { Module } from '@nestjs/common';
import { ReceivingSlipsService } from './receiving_slips.service';
import { ReceivingSlipsController } from './receiving_slips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceivingSlip } from './receiving_slip.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReceivingSlip])],
    controllers: [ReceivingSlipsController],
    providers: [ReceivingSlipsService],
})
export class ReceivingSlipsModule { }
