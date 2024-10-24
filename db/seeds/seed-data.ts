import { Warehouse } from "../../src/modules/warehouses/warehouse.entity";
import { Staff } from "../../src/modules/staffs/staff.entity";
import { Customer } from "../../src/modules/customers/customer.entity";
import { RicePlant } from "../../src/modules/riceplants/riceplant.entity";
import { EntityManager } from "typeorm";
import { v4 as uuid4 } from "uuid";
import * as bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

export const seedData = async (manager: EntityManager): Promise<void> => {
    await seedWarehouses();
    await seedStaffs();
    await seedCustomers();
    await seedRicePlants(manager);

    async function seedWarehouses() {

    }

    async function seedStaffs() {

    }

    async function seedCustomers() {

    }

    async function seedRicePlants(manager: EntityManager) {
        const riceTypes = [
            'Lúa a cuốc',
            'Ba lá Nghệ An',
            'Ba tháng nước Nghệ An',
            'Bake',
            'Balo',
            'Bằng muộn Nghệ An',
            'Bầu dâu Phú Thọ',
            'Bầu đỏ Hải Phòng',
            'Bầu đỏ Thái Bình',
            'Bầu Hà Đông',
            'Bầu Hải Dương',
            'Bầu hương Hải Dương',
            'Bầu quái',
            'Bầu quảng Phú Thọ',
            'Bầu Thái Bình',
            'Bầu Thái Bình trắng',
            'Bầu Thanh Hoá',
            'Bầu Vĩnh Phúc',
            'Bầu Yên Sơn',
            'Bèo cại nác',
            'Bèo cằn cứu',
            'Bèo cú',
            'Bèo đàng',
            'Bèo mù cú',
            'Lúa cẩm',
            'Cẩm panh',
            'Cẩm vỏ vàng',
            'Canh nông Bắc Giang',
            'Canh nông Bắc Ninh',
            'Canh nông Mỹ Tho',
            'Canh nông Nghệ An',
            'Canh nông Tuyên Quang',
            'Câu Phú Xuyên',
            'Câu Thái Bình',
            'Chăm lai Tây Bắc',
            'Chăm lượng',
            'Chanh Phú Thọ',
            'Chanh Sơn Tây',
            'Chiêm bắc',
            'Chiêm bò',
            'Chiêm chanh',
            'Chiêm chanh 198A',
            'Chiêm chớ',
            'Chiêm cò Nghệ An',
            'Chiêm cườm',
            'Chiêm di đông',
            'Chiêm đỏ dạng 1',
            'Chiêm đỏ dạng 2',
            'Chiêm khẩn lo',
            'Chiêm lốc Nghệ An',
            'Chiêm nam 2',
            'Chiêm Nam Ninh tràng đá',
            'Chiêm ngân',
            'Chiêm Ngân Sơn',
            'Chiêm ngâu',
            'Chiêm Nghệ An',
            'Chiêm ngù Nghệ An',
            'Chiêm nhỡ Bắc Ninh 1',
            'Chiêm Phú Xuyên',
            'Chiêm quáo Nghệ An',
            'Chiêm râu',
            'Chiêm râu Tây Bắc',
            'Chiêm sách',
            'Chiêm sành Cẩm Khê',
            'Chiêm số 1',
            'Chiêm số 1 Thanh Hoá',
            'Chiêm tăng sản',
            'Chiêm tây',
            'Chiêm thanh',
            'Chiêm thống nhất 1',
            'Chiêm thống nhất 2',
            'Chiêm Thừa Thiên',
            'Chiêm tía chân',
            'Chiêm tía chân Thái Nguyên',
            'Chiêm trắng',
            'Chiêm trắng',
            'Chiêm trắng chân',
            'Chiêm trắng vỏ 1',
            'Chiêm trắng vỏ 2',
            'Chiêm trắng vỏ Hải Phòng',
            'Chiêm tứ thời',
            'Chiêm viên',
            'Chiêm xiêm',
            'Chua tan',
        ];

        for (const [index, type] of riceTypes.entries()) {
            const ricePlant = manager.create(RicePlant, {
                id: index + 1, // Nếu ID là tự tăng, bạn không cần chỉ định ID
                Name: type,
                Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
            });

            await manager.save(ricePlant);
        }
    }
}
