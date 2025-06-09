import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user.entity";
@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id!:number;
    @Column({unique:true})
    name!:string;
    
    @OneToMany(()=> User,(user)=> user.department)
    users!:User[]
}