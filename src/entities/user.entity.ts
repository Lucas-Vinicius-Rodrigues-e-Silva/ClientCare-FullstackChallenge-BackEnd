import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./client.entity";
import { hashSync, getRounds } from "bcryptjs";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column({ length: 11 })
  phoneNumber: string;

  @CreateDateColumn()
  registryDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAdm: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Client, (client) => client.userWhoAdd)
  clients: Client[];

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    const isEncripted = getRounds(this.password);
    if (!isEncripted) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export { User };
