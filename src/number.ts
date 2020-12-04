import { Query, Arg } from './types';
import { q } from './types.internal';

export const add = (as: Arg<number[]>) => q.Add(as) as Query<number>;
export const subtract = (as: Arg<number[]>) => q.Subtract(as) as Query<number>;
export const multiply = (as: Arg<number[]>) => q.Multiply(as) as Query<number>;
export const divide = (as: Arg<number[]>) => q.Divide(as) as Query<number>;
