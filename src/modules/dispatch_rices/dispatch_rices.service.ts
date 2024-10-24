import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DispatchRice } from './dispatch_rice.entity';
import { CreateDispatchRicesDTO } from './dto/createDispatchRices.dto';

@Injectable()
export class DispatchRicesService {
    constructor(
        @InjectRepository(DispatchRice)
        private dispatchRiceRepository: Repository<DispatchRice>,
    ) { };

    async getAmountByTypeRices(): Promise<any[]> {
        const result = await this.dispatchRiceRepository
            .createQueryBuilder('dispatchRices')
            .select('SUM(dispatchRices.Amount)', 'total')
            .addSelect('rice.Name', 'riceName')
            .addSelect('rice.id', 'riceId')
            .innerJoin('dispatchRices.ricePlant', 'rice')
            .groupBy('dispatchRices.ID_RicePlant')
            .getRawMany();

        return result;
    };

    async getAmountByTypeRicesAndWarehouseId(warehouseId: number, timeStart: string, timeEnd: string): Promise<any[]> {
        const result = await this.dispatchRiceRepository
            .createQueryBuilder('dispatchRices')
            .select('SUM(dispatchRices.Amount)', 'total')
            .addSelect('rice.Name', 'riceName')
            .addSelect('rice.id', 'riceId')
            .innerJoin('dispatchRices.dispatchSlip', 'dispatchSlip')
            .innerJoin('dispatchRices.ricePlant', 'rice')
            .where('dispatchSlip.ID_Warehouse = :id', {
                id: warehouseId,
            })
            .andWhere('dispatchSlip.CreatedAt BETWEEN :startDate AND :endDate', {
                startDate: timeStart,
                endDate: timeEnd,
            })
            .groupBy('dispatchRices.ID_RicePlant')
            .getRawMany();

        return result;
    };

    async create(data: CreateDispatchRicesDTO): Promise<boolean> {
        try {
            for (const riceplant of data.listRices) {
                const newDispatchRice = {
                    ID_DispatchSlip: data.dispatchSlipId,
                    ID_RicePlant: riceplant.id,
                    UnitPrice: riceplant.UnitPrice,
                    Amount: riceplant.Amount,
                };

                await this.dispatchRiceRepository.save(newDispatchRice);
            };

            return true;
        } catch (error) {
            console.log('Xảy ra lỗi trong lúc thêm danh sách lúa vào đơn xuất: ', error);
            return false;
        };
    };
}
