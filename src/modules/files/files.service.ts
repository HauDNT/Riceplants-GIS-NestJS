import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { Warehouse } from '../warehouses/warehouse.entity';
import { Staff } from '../staffs/staff.entity';
import { Customer } from '../customers/customer.entity';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(Warehouse)
        private warehouseRepository: Repository<Warehouse>,
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) { };

    private objectFound: any = null;

    async findByTypeAndId(type: string, id: number) {
        switch (type) {
            case 'customers':
                this.objectFound = await this.customerRepository.findOneBy({ id });
                break;
            case 'staffs':
                this.objectFound = await this.staffRepository.findOneBy({ id });
                break;
            case 'warehouses':
                this.objectFound = await this.warehouseRepository.findOneBy({ id });
                break;
            default:
                break;
        };

        return this.objectFound;
    };

    async removeImageFromDisk(type: string): Promise<Boolean> {
        try {
            this.objectFound?.imageUrl &&
                await fs.promises.unlink(`public/${type}/${this.objectFound.imageUrl}`);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        };
    };

    async saveToDatabase(fileName: string, type: string, id: number) {
        try {
            switch (type) {
                case 'customers':
                    await this.customerRepository.update(id, { imageUrl: fileName });
                    break;
                case 'staffs':
                    await this.staffRepository.update(id, { imageUrl: fileName });
                    break;
                case 'warehouses':
                    await this.warehouseRepository.update(id, { imageUrl: fileName });
                    break;
                default:
                    break;
            };
        } catch (error) {
            console.log(error);
            return false;
        };
    };

    async saveAvatar(file: Express.Multer.File, type: string, id: number): Promise<{fileName: string, status: boolean}> {
        try {
            await this.findByTypeAndId(type, id);

            if (this.objectFound) {
                await this.removeImageFromDisk(type);
    
                const dirName = `public/${type}/`;
    
                if (!fs.existsSync(dirName)) {
                    fs.mkdirSync(dirName, { recursive: true });
                }
    
                const uniqueSuffix = uuidv4();
                const ext = file.originalname.split('.').pop();
                const filePath = `${dirName}${uniqueSuffix}.${ext}`;

                await sharp(file.buffer)
                    .resize(1200, 800, { fit: 'cover'})
                    .toFile(filePath);
    
                // fs.writeFileSync(filePath, file.buffer);
    
                await this.saveToDatabase(`${uniqueSuffix}.${ext}`, type, id);
    
                return {
                    fileName: `${uniqueSuffix}.${ext}`,
                    status: true,
                };
            };

            return {
                fileName: "",
                status: false,
            };
        } catch (error) {
            console.log(error);
            
            return {
                fileName: "",
                status: false,
            };
        }
    };
};