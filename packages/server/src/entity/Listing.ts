import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("listings")
export class Listings extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 100})
  name: string;

  @Column("text")
  pictureUrl: string;

  @Column("varchar", {length: 255})
  description: string;

  @Column("int")
  price: number;

  @Column("double precision")
  latitude: number;

  @Column("double precision")
  longitude: number;

  @Column("int")
  beds: number;

  @Column("int")
  guests: number;

  @Column("text", {array: true})
  amenities: string[];

}
