import { DispatchSlip } from "../dispatch_slips/dispatch_slip.entity";
import { ReceivingSlip } from "../receiving_slips/receiving_slip.entity";
import { Warehouse } from "../warehouses/warehouse.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity("staffs")
export class Staff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Fullname: string;

    @Column()
    Email: string;

    @Column()
    PhoneNumber: string;

    @Column()
    @Exclude()
    Password: string;

    @Column()
    Gender: boolean;

    @Column("text")
    Address: string;

    @Column({ type: 'varchar', nullable: true })
    imageUrl: string;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date | null;
    
    @ManyToOne(() => Warehouse, warehouse => warehouse.staffs)
    warehouse: Warehouse;
    
    @OneToMany(() => DispatchSlip, dispatchSlips => dispatchSlips.customer)
    dispatchSlips: DispatchSlip[];

    @OneToMany(() => ReceivingSlip, receivingSlips => receivingSlips.customer)
    receivingSlips: ReceivingSlip[];
}