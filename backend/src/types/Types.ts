export type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'Job Seeker' | 'Recruiter';
};
