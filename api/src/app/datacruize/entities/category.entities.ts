import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Subcategory } from "./subcategory.entities";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Subcategory, (subcat) => subcat.category)
  subcategories!: Subcategory[];
}
