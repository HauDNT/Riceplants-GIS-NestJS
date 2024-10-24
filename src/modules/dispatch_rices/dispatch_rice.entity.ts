import { DispatchSlip } from "../dispatch_slips/dispatch_slip.entity";
import { RicePlant } from "../riceplants/riceplant.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";


@Entity("dispatch_rice")
export class DispatchRice {
    @PrimaryColumn()
    ID_DispatchSlip: number;

    @PrimaryColumn()
    ID_RicePlant: number;

    @Column()
    Amount: number;

    @Column()
    UnitPrice: number;

    @ManyToOne(() => DispatchSlip, dispatchSlip => dispatchSlip.dispatchRices)
    @JoinColumn({ name: "ID_DispatchSlip" })
    dispatchSlip: DispatchSlip;

    @OneToOne(() => RicePlant, ricePlant => ricePlant.dispatchRice)
    @JoinColumn({ name: "ID_RicePlant" })
    ricePlant: RicePlant;
}