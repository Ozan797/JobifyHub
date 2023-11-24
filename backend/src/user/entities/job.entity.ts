import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Application } from './application.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @ManyToOne(() => User, (user) => user.jobs)
  employer: User;

  @OneToMany(() => Application, (application) => application.job)
  applications: Application[]; // Define the 'applications' property here
}
