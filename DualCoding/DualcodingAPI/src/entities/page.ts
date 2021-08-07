import { AfterUpdate, BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { user } from "./user";

@Entity()
export class page extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    address: string;

    @Column("text", { array: true })
    contentBody: string[];

    @Column()
    creatorId: number;

    @ManyToOne(() => user, (u) => u.pages)
    creator: Promise<user>;
  static creatorId: Express.User | undefined;
  static contentBody: any;

}
    
    