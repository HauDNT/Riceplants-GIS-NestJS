import { Module } from '@nestjs/common';
import { DispatchSlipsService } from './dispatch_slips.service';
import { DispatchSlipsController } from './dispatch_slips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchSlip } from './dispatch_slip.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DispatchSlip])],
    controllers: [DispatchSlipsController],
    providers: [DispatchSlipsService],
})
export class DispatchSlipsModule {}
