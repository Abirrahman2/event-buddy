import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { deflate } from "zlib";
import { Events } from "src/events/ENTITIES/event.entity";
import { Booking } from "src/booking/ENTITES/booking.entity";
@Entity()
export class User{


    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fullName:string;
    @Column()
    email:string;
    @Column({default:'user'})
    role:string;
    @Column()
    password:string;
   
    @OneToMany(()=>Booking,(booking)=>booking.user)
    bookings:Booking[];
}