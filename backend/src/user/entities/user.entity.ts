import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from './job.entity';
import { Application } from './application.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Job, (job) => job.employer)
  jobs: Job[];

  @OneToMany(() => Application, (application) => application.applicant)
  applications: Application[];
}
