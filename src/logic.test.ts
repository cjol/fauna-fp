import { query as q } from 'faunadb';
import { expectTypeOf } from 'expect-type';
import { Query, time } from './types';
import {
  and,
  containsField,
  containsPath,
  containsValue,
  equals,
  exists,
  gt,
  gte,
  lt,
  lte,
  not,
  or,
} from './logic';
import { pipe, tuple } from 'fp-ts/lib/function';
import { add } from './number';
import { spread } from './tuple';
import { collection, ref } from './database';
describe('control flow', () => {
  test('and', () => {
    const input = [true, true, false];
    const result = pipe(input, and(false), tuple, and());
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.And(q.And(false, true, true, false)));
  });

  test('containsField', () => {
    const containsFoo = containsField('foo');
    const result = containsFoo({ foo: [{ bar: 1 }] });
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.ContainsField('foo', { foo: [{ bar: 1 }] }));
  });

  test('containsPath', () => {
    const f = containsPath('foo', 0, 'bar');
    const result = f({ foo: [{ bar: 1 }] });
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(
      q.ContainsPath(['foo', 0, 'bar'], { foo: [{ bar: 1 }] })
    );
  });

  test('containsValue', () => {
    const contains3 = containsValue(3);
    const result = contains3({ a: 1, b: 2, c: 3 });
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(
      q.ContainsValue(3, {
        a: 1,
        b: 2,
        c: 3,
      })
    );
  });

  test('equals', () => {
    const equals5 = equals(5);
    const result = equals5(4);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Equals(5, 4));
  });

  test('exists', () => {
    const result = exists(ref(collection('my_foos'))('123'));
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Exists(q.Ref(q.Collection('my_foos'), '123')));
  });

  test('gt', () => {
    const result = pipe([3, 3], spread(add()), gt(5));
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.GT(q.Add(3, 3), 5));
  });

  test('GTE', () => {
    const result = pipe([3, 3], spread(add()), gte(5));
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.GTE(q.Add(3, 3), 5));
  });

  test('lt', () => {
    const result = pipe([3, 3], spread(add()), lt(5));
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.LT(q.Add(3, 3), 5));
  });

  test('lte', () => {
    const result = pipe([3, 3], spread(add()), lte(5));
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.LTE(q.Add(3, 3), 5));
  });

  test('not', () => {
    const result = pipe(true, not, not);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Not(q.Not(true)));
  });

  test('or', () => {
    const input = [true, true, false];
    const result = pipe(input, or(false), tuple, or());
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Or(q.Or(false, true, true, false)));
  });
});
