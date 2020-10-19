import { Arg, q, Query, Result } from './types';

export const abort: (x: Arg<string>) => Query<never> = (x) => q.Abort(x);

export const iff = <O>(ifTrue: Arg<O>, ifFalse: Arg<O>) => (
  x: Arg<boolean>
): Query<Result<O>> => q.If(x, ifTrue, ifFalse);

export const equals = <O>(a: Arg<O>) => (b: Arg<O>): Query<boolean> =>
  q.Equals(a, b);
