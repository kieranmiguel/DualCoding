import { AfterUpdate, BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class user extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number; 

    @Column("text", { array: true })
    contentBody: string[];

    @Column("text", {unique: true})
    githubID: string;

    @Column("text", {nullable: true})
    name: string;
    
    

    


    


}