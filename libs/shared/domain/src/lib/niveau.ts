export const Niveaus = ['beginner', 'intermediate', 'advanced', 'expert'] as const;
export type INiveau = typeof Niveaus[number];
