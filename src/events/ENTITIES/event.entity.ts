import { timestamp } from "rxjs";
import { Booking } from "src/booking/ENTITES/booking.entity";
import { User } from "src/users/ENTITIES/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Events{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;
    @Column()
    date:Date;
    @Column({nullable:true})
    time:string;
    @Column({nullable:true})
    description:string;
    @Column()
    location:string;
    @Column()
    capacity:number;
    @Column({nullable:true})
    remaining:number;
    @Column({nullable:true})
    tags:string;
    @Column({nullable:true})
    image:string;
   
    @OneToMany(()=>Booking,(booking)=>booking.event)
    bookings:Booking[];
  

}