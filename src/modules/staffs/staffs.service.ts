import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Staff } from './staff.entity';
import { Repository } from 'typeorm';
import { omitFields } from '../../common/helper/omit_field.helper';
import { CreateStaffDTO } from './dto/createStaff.dto';
import { UpdateStaffDTO } from './dto/updateStaff.dto';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) { };

  async findOneByUsername(username: string, isEmail: boolean): Promise<Staff> {
    let staff = null;

    if (isEmail) {
      staff = await this.staffRepository.findOneBy({
        Email: username,
        isDeleted: false,
      });
    } else {
      staff = await this.staffRepository.findOneBy({
        PhoneNumber: username,
        isDeleted: false,
      });
    }

    return staff;
  };

  async checkExistWithEmail(email: string): Promise<boolean> {
    const staff = await this.staffRepository.findOneBy({
      Email: email,
      isDeleted: false,
    });

    return staff ? true : false;
  };

  async checkExistWithPhone(phone: string): Promise<boolean> {
    const staff = await this.staffRepository.findOneBy({
      PhoneNumber: phone,
      isDeleted: false,
    });

    return staff ? true : false;
  };

  async getAll(): Promise<Staff[]> {
    let staffs = await this.staffRepository.find({
      where: { isDeleted: false },
    });

    staffs = staffs.map((staff) => {
      return plainToClass(
        Staff,
        omitFields(staff, ['deletedAt', 'isDeleted']),
      );
    });

    console.log(staffs);


    return staffs;
  };

  async getDetail(id: number): Promise<Staff> {
    const result = await this.staffRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['warehouse'],
    });

    const fomatResult = {
      ...result,
      warehouse: result.warehouse.id,
    };

    return plainToClass(
      Staff,
      omitFields(fomatResult, ['deletedAt', 'isDeleted']),
    );
  };

  async getStaffsDeleted(): Promise<Staff[]> {
    const staffsDeleted = await this.staffRepository.find({
      where: { isDeleted: true },
    });

    staffsDeleted.forEach((staff, index) => {
      staffsDeleted[index] = omitFields(staff, ['isDeleted', 'Password']);
    });

    return staffsDeleted;
  };

  async getAmount(): Promise<number> {
    const amount = await this.staffRepository.findAndCount();

    return amount[1];
  };

  async create(data: CreateStaffDTO): Promise<Staff> {
    const staff = omitFields(await this.staffRepository.save(data), [
      'isDeleted',
      'deletedAt',
    ]);

    return plainToClass(Staff, staff);
  };

  async update(id: number, data: UpdateStaffDTO) {
    let checkExist = false;
    const staff = await this.staffRepository.findOneBy({
      id,
      isDeleted: false,
    });

    if (data.Email !== staff.Email) {
      checkExist = await this.checkExistWithEmail(data.Email);

      if (checkExist) return false;
    }

    if (data.PhoneNumber !== staff.PhoneNumber) {
      checkExist = await this.checkExistWithPhone(data.PhoneNumber);

      if (checkExist) return false;
    }

    staff.Fullname = data.Fullname;
    staff.Gender = data.Gender;
    staff.Address = data.Address;
    staff.Email = data.Email;
    staff.PhoneNumber = data.PhoneNumber;
    staff.warehouse = data.warehouse;

    return this.staffRepository.save(staff);
  };

  async softDelete(id: number): Promise<Staff> {
    const staff = await this.staffRepository.findOneBy({ id });

    staff.isDeleted = true;
    staff.deletedAt = new Date();

    return this.staffRepository.save(staff);
  };

  async restore(id: number): Promise<Staff> {
    const staff = await this.staffRepository.findOneBy({ id });

    staff.isDeleted = false;
    staff.deletedAt = null;

    return this.staffRepository.save(staff);
  };
}
