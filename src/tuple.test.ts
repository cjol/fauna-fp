import { concatTuple, toTuple, tuple } from './tuple';
import { pipe } from 'fp-ts/function';
import { expectTypeOf } from 'expect-type';

describe('tuple', () => {
  const t1 = tuple('hello', 12, true);
  const t2 = tuple('hello');
  test('tuple', () => {
    expectTypeOf(t1).toEqualTypeOf<[string, number, boolean]>();
  });
  test('toTuple', () => {
    const result = pipe(true, toTuple(...t1));
    expectTypeOf(result).toEqualTypeOf<[boolean, string, number, boolean]>();
  });
  test('concatTuple', () => {
    const result = pipe(t2, concatTuple(...t1));
    expectTypeOf(result).toEqualTypeOf<[string, string, number, boolean]>();
  });
});
