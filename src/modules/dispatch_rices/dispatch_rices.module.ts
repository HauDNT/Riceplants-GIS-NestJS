import { Module } from '@nestjs/common';
import { DispatchRicesService } from './dispatch_rices.service';
import { DispatchRicesController } from './dispatch_rices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchRice } from './dispatch_rice.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DispatchRice])],
    controllers: [DispatchRicesController],
    providers: [DispatchRicesService],
})
export class DispatchRicesModule {}
