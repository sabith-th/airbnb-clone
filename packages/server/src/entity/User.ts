import * as bcrypt from "bcryptjs";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Listing } from "./Listing";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255, nullable: true })
  email: string | null;

  @Column("text", { nullable: true })
  password: string | null;

  @Column("boolean", { default: false })
  confirmed: boolean;

  @Column("boolean", { default: false })
  forgotPasswordLocked: boolean;

  @Column("text", { nullable: true })
  twitterId: string | null;

  @OneToMany(() => Listing, listing => listing.user)
  listings: Listing[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
