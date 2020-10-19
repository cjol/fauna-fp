import { Arg, Query, q } from './types';

export const length = (item: Arg<string>): Query<number> => q.Length(item);
