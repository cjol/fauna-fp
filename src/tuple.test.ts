import { concatTuple, spread, toTuple } from './tuple';
import { pipe, tuple } from 'fp-ts/function';
import { expectTypeOf } from 'expect-type';
import { add } from './number';

describe('tuple', () => {
  const t1 = tuple('hello', 12, true);
  const t2 = tuple('hello');
  test('toTuple', () => {
    const result = pipe(true, toTuple(...t1));
    expectTypeOf(result).toEqualTypeOf<[boolean, string, number, boolean]>();
  });
  test('concatTuple', () => {
    const result = pipe(t2, concatTuple(...t1));
    expectTypeOf(result).toEqualTypeOf<[string, string, number, boolean]>();
  });
  test('spread', () => {
    const f = (...xs: number[]) => xs[0];
    const j = spread(f);
    const r2 = j([4, 5, 6]);
    expectTypeOf(r2).toEqualTypeOf<number>();
  });
});
