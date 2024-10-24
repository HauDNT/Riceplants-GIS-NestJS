import { Module } from '@nestjs/common';
import { RiceplantsService } from './riceplants.service';
import { RiceplantsController } from './riceplants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RicePlant } from './riceplant.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RicePlant])],
    controllers: [RiceplantsController],
    providers: [RiceplantsService],
})
export class RiceplantsModule { }
