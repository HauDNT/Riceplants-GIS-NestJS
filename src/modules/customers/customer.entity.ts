import { DispatchSlip } from '../dispatch_slips/dispatch_slip.entity';
import { ReceivingSlip } from '../receiving_slips/receiving_slip.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Fullname: string;

    @Column()
    Email: string;

    @Column()
    PhoneNumber: string;

    @Column()
    Gender: boolean;

    @Column('text')
    Address: string;

    @Column({ type: 'varchar', nullable: true })
    imageUrl: string;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date | null;

    @OneToMany(() => DispatchSlip, (dispatchSlips) => dispatchSlips.customer)
    dispatchSlips: DispatchSlip[];

    @OneToMany(() => ReceivingSlip, (receivingSlips) => receivingSlips.customer)
    receivingSlips: ReceivingSlip[];
}
