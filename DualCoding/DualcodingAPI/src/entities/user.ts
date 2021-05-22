import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class user extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number; 

    @Column("text", { array: true })
    contentBody: string[];

    @Column({nullable: true})
    createdBy: number;

    


    


}