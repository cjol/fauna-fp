import { O } from 'ts-toolbelt';
import { Arg, Query, q } from './types';

// TODO: does this work with arrays?

export const select = <P extends string[]>(...path: P) => <T extends object>(
  item: Arg<T>
): Query<O.Path<T, P>> => q.Select(path, item);
