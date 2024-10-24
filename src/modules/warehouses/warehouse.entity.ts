import { DispatchSlip } from "../dispatch_slips/dispatch_slip.entity";
import { ReceivingSlip } from "../receiving_slips/receiving_slip.entity";
import { Staff } from "../staffs/staff.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("warehouses")
export class Warehouse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    Name: string;

    @Column({ type: 'varchar' })
    Address: string;

    @Column({ type: 'double', precision: 25, scale: 20, nullable: true })
    Latitude: number;

    @Column({ type: 'double', precision: 25, scale: 20, nullable: true })
    Longitude: number;

    @Column({ type: 'varchar', nullable: true })
    imageUrl: string;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date | null;

    @OneToMany(() => Staff, staff => staff.warehouse)
    staffs: Staff[];

    @OneToMany(() => ReceivingSlip, receivingSlip => receivingSlip.warehouse)
    receivingSlips: ReceivingSlip[];

    @OneToMany(() => DispatchSlip, dispatchSlips => dispatchSlips.warehouse)
    dispatchSlips: DispatchSlip[];
}