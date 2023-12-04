export const Roles = ['student', 'teacher', 'admin'] as const;
export type IRole = typeof Roles[number];
