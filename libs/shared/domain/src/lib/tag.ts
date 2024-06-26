export interface ITag {
  _id: string;
  name: string;
  category: string;
  isActive?: boolean;
}

export type ICreateTag = Pick<ITag, 'name' | 'category' | 'isActive'>;
export type IUpdateTag = Pick<ITag, 'name' | 'category' | 'isActive'>;
