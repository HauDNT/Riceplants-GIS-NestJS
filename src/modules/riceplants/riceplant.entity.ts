import { DispatchRice } from "../dispatch_rices/dispatch_rice.entity";
import { ReceivingRice } from "../receiving_rices/receiving_rice.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('riceplants')
export class RicePlant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Name: string;

    @Column({ type: 'varchar', nullable: true })
    Description: string;

    @Column({ type: 'varchar', nullable: true })
    imageUrl: string;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date | null;

    @OneToOne(() => ReceivingRice, receiveRice => receiveRice.ricePlant)
    receiveRice: ReceivingRice;

    @OneToOne(() => DispatchRice, dispatchRice => dispatchRice.ricePlant)
    dispatchRice: DispatchRice;
}