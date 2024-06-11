import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  userName: string;

  @Column()
  encryptPassword: string;

  @Column({default: true})
  isWork: boolean;

  @BeforeInsert()
  addId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
