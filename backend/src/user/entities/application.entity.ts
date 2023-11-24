import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Job } from './job.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.applications)
  applicant: User;

  @ManyToOne(() => Job, (job) => job.applications)
  job: Job;

  @Column()
  resume: string;

  @Column()
  coverLetter: string;

  @Column()
  applicationStatus: string;
}
