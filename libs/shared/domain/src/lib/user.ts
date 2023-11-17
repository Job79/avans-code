export type Role = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  profileUrl: string;
  role: Role;
}
