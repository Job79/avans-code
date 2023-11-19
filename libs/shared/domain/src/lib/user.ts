export const Roles = ['student', 'teacher', 'admin'] as const;
export type Role = typeof Roles[number];

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  profileUrl: string;
  role: Role;
}
