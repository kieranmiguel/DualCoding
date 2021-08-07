import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { page } from "./page";

@Entity()
export class user extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number; 

    @Column("text", {unique: true})
    githubID: string;

    @Column("text", {nullable: true})
    name: string;

    
    @OneToMany(() => page, p => p.creator)
    pages: Promise<page[]>;

}