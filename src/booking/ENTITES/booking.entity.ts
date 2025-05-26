import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/ENTITIES/users.entity";
import { Events } from "src/events/ENTITIES/event.entity";
@Entity()
export class Booking{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    userId:number;
    @Column()
    eventId:number;
    @Column()
    totalSeate:number;
    @CreateDateColumn()
    bookingDate:Date;
    @Column({default:'pending'})
    paymentStatus:string;
    @ManyToOne(()=>User, (user)=>user.bookings)
    @JoinColumn({name:'userId'})
     user: User;

     @ManyToOne(()=>Events, (event)=>event.bookings)
     @JoinColumn({name:'eventId'})
     event: Events;
    
    
}