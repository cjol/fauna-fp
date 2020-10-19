import { O } from 'ts-toolbelt';
import { Arg, Query, q } from './types';

export const select = <P extends (string | number)[]>(...path: P) => <
  T extends object
>(
  item: Arg<T>
): Query<O.Path<T, P> extends Query<infer U> ? U : O.Path<T, P>> =>
  q.Select(path, item);
