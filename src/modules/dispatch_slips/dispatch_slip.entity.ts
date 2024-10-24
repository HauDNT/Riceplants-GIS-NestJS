import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customers/customer.entity";
import { Staff } from "../staffs/staff.entity";
import { Warehouse } from "../warehouses/warehouse.entity";
import { DispatchRice } from "../dispatch_rices/dispatch_rice.entity";

@Entity("dispatch_slips")
export class DispatchSlip {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ID_Warehouse: number;
    
    @Column()
    ID_Customer: number;

    @Column()
    ID_Staff: number;

    @Column("datetime") 
    CreatedAt: Date;

    @ManyToOne(() => Customer, customer => customer.dispatchSlips)
    @JoinColumn({ name: "ID_Customer" })
    customer: Customer;

    @ManyToOne(() => Staff, staff => staff.dispatchSlips)
    @JoinColumn({ name: "ID_Staff" })
    staff: Staff;

    @ManyToOne(() => Warehouse, warehouse => warehouse.dispatchSlips)
    @JoinColumn({ name: "ID_Warehouse" })
    warehouse: Warehouse;

    @OneToMany(() => DispatchRice, dispatchRices => dispatchRices.dispatchSlip)
    dispatchRices: DispatchRice[];
}