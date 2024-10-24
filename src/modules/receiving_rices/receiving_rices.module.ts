import { Module } from '@nestjs/common';
import { ReceivingRicesService } from './receiving_rices.service';
import { ReceivingRicesController } from './receiving_rices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceivingRice } from './receiving_rice.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReceivingRice])],
    controllers: [ReceivingRicesController],
    providers: [ReceivingRicesService],
})
export class ReceivingRicesModule {}
