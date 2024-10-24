import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { Create_UpdateCustomerDTO } from './dto/create_update-customer.dto';
import { omitFields } from 'src/common/helper/omit_field.helper';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) { };


    async checkExistWithEmail(email: string): Promise<boolean> {
        const staff = await this.customerRepository.findOneBy({
            Email: email,
            isDeleted: false,
        });

        return staff ? true : false;
    };

    async checkExistWithPhone(phone: string): Promise<boolean> {
        const staff = await this.customerRepository.findOneBy({
            PhoneNumber: phone,
            isDeleted: false,
        });

        return staff ? true : false;
    };

    async getAll(): Promise<Customer[]> {
        let customers = await this.customerRepository.find({
            where: { isDeleted: false }
        });

        customers.forEach((item, index) => {
            customers[index] = omitFields(item, ['imageUrl', 'isDeleted', 'deletedAt']);
        });

        return customers;
    };

    async getCustomersDeleted(): Promise<Customer[]> {
        const customersDeleted = await this.customerRepository.find({
            where: {
                isDeleted: true,
            },
        });

        return customersDeleted;
    };

    async create(data: Create_UpdateCustomerDTO): Promise<Customer> {
        let newCustomer = this.customerRepository.create(data);
        newCustomer = omitFields(newCustomer, ['isDeleted', 'deletedAt']);

        return await this.customerRepository.save(newCustomer);
    };

    async update(id: number, data: Create_UpdateCustomerDTO): Promise<Customer> {
        let checkExist = false;
        const customer = await this.customerRepository.findOneBy({ id, isDeleted: false });

        if (data.Email !== customer.Email) {
            checkExist = await this.checkExistWithEmail(data.Email);

            if (checkExist) throw new Error('Email đã tồn tại!');;
        };

        if (data.PhoneNumber !== customer.PhoneNumber) {
            checkExist = await this.checkExistWithPhone(data.PhoneNumber);

            if (checkExist) throw new Error('Số điện thoại đã tồn tại!');;
        };

        customer.Fullname = data.Fullname || customer.Fullname;
        customer.Email = data.Email || customer.Email;
        customer.PhoneNumber = data.PhoneNumber || customer.PhoneNumber;
        customer.Gender = data.Gender !== undefined ? data.Gender : customer.Gender;
        customer.Address = data.Address || customer.Address;

        return omitFields(await this.customerRepository.save(customer), ['isDeleted', 'deletedAt', 'imageUrl']);
    };

    async softDelete(id: number): Promise<Customer> {
        const customer = await this.customerRepository.findOneBy({ id });

        customer.isDeleted = true;
        customer.deletedAt = new Date();

        return this.customerRepository.save(customer);
    };

    async restore(id: number): Promise<Customer> {
        const customer = await this.customerRepository.findOneBy({
            id: id,
            isDeleted: true,
        });

        customer.isDeleted = false;
        customer.deletedAt = null;

        return this.customerRepository.save(customer);
    };


}
