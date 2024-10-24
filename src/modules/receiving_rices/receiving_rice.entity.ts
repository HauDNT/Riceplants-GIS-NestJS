import { ReceivingSlip } from "../receiving_slips/receiving_slip.entity";
import { RicePlant } from "../riceplants/riceplant.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";


@Entity("receiving_rice")
export class ReceivingRice {
    @PrimaryColumn()
    ID_ReceivingSlip: number;

    @PrimaryColumn()
    ID_RicePlant: number;

    @Column()
    Amount: number;

    @Column()
    UnitPrice: number;

    @ManyToOne(() => ReceivingSlip, receiveSlip => receiveSlip.receiveRices)
    @JoinColumn({ name: "ID_ReceivingSlip" })
    receivingSlip: ReceivingSlip;

    @OneToOne(() => RicePlant, ricePlant => ricePlant.receiveRice)
    @JoinColumn({ name: "ID_RicePlant" })
    ricePlant: RicePlant;
}