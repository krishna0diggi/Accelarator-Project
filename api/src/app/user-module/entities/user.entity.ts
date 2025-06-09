import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Department } from "./dept.entity";
import { Role } from "./role.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  empId!: string;
  @Column()
  password!: string;

  @Column({ name: "otp" })
  otp!: string;

  @Column({ name: "is_verified", default: false, type: "boolean" })
  isVerified!: boolean;

  @Column({ name: "otp_expires_at", type: "timestamp", nullable: true })
  otpExpiresAt!: Date | null;

  @ManyToOne(() => Department, (dept) => dept.users, { eager: true })
  @JoinColumn({ name: "dept_id" })
  department!: Department;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role!: Role;
}
