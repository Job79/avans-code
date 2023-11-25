export const Roles = ['student', 'teacher', 'admin'] as const;
export type Role = typeof Roles[number];
