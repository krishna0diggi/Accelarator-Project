import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./category.entities";

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  url!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @ManyToOne(() => Category, (cat) => cat.subcategories,)
  @JoinColumn({ name: "category_id" }) // This will create a category_id column in Subcategory table
  category!: Category;
}
