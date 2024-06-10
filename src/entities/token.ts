import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import {User} from "./user";

@Entity() 
export class Token {
  @PrimaryGeneratedColumn('uuid')
  tokenId: string;

  @ManyToOne(() => User, user => user.id, { cascade: true })
  @JoinColumn({ name: "userId" }) 
  userId: string;

  @Column()
  token: string;

  @Column()
  refreshToken: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @BeforeInsert()
  addId() {
    this.tokenId = uuidv4();
  }
}