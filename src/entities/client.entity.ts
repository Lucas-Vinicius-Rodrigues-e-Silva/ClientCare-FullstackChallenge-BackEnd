import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contact } from "./contacts.entity";
import { User } from "./user.entity";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 11 })
  phoneNumber: string;

  @CreateDateColumn()
  registryDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Contact, (contact) => contact.clientWhoBelongs)
  contacts: Contact[];

  @ManyToOne(() => User, (user) => user, { onDelete: "CASCADE" })
  userWhoAdd: User;
}

export { Client };
