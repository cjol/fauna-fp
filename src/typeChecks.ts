import { Arg, Query } from './types';
import { q } from './types.internal';

export const isNull = (arg: Arg<unknown>) => q.IsNull(arg) as Query<boolean>;

export const isString = (arg: Arg<unknown>) =>
  q.IsString(arg) as Query<boolean>;

// TODO: type check functions
