import { query as q } from 'faunadb';
import { expectTypeOf } from 'expect-type';
import { Query } from './types';
import { or } from "./or";
import { not } from "./not";
import { lte } from "./lte";
import { lt } from "./lt";
import { gte } from "./gte";
import { gt } from "./gt";
import { exists } from "./exists";
import { equals } from "./equals";
import { containsValue } from "./containsValue";
import { containsPath } from "./containsPath";
import { containsField } from "./containsField";
import { and } from "./and";
import { pipe, } from 'fp-ts/lib/function';
import { add } from "./add";
import { collection } from "./collection";
import { ref } from "./ref";
describe('control flow', () => {
  test('and', () => {
    const result = and(and(false, true, true), false);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.And(q.And(false, true, true), false));
  });

  test('containsField', () => {
    const result = containsField('foo', { foo: [{ bar: 1 }] });
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.ContainsField('foo', { foo: [{ bar: 1 }] }));
  });

  test('containsPath', () => {
    const result = containsPath(['foo', 0, 'bar'], { foo: [{ bar: 1 }] });
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(
      q.ContainsPath(['foo', 0, 'bar'], { foo: [{ bar: 1 }] })
    );
  });

  test('containsValue', () => {
    const result = containsValue(3, { a: 1, b: 2, c: 3 });
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
    const result = equals(5, 4);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Equals(5, 4));
  });

  test('exists', () => {
    const result = exists(ref(collection('my_foos'), '123'));
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Exists(q.Ref(q.Collection('my_foos'), '123')));
  });

  test('gt', () => {
    const result = gt([add([3, 3]), 5]);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.GT([q.Add([3, 3]), 5]));
  });

  test('gte', () => {
    const result = gte([add([3, 3]), 5]);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.GTE([q.Add([3, 3]), 5]));
  });

  test('lt', () => {
    const result = lt([add([3, 3]), 5]);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.LT([q.Add([3, 3]), 5]));
  });

  test('lte', () => {
    const result = lte([add([3, 3]), 5]);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.LTE([q.Add([3, 3]), 5]));
  });

  test('not', () => {
    const result = pipe(true, not, not);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Not(q.Not(true)));
  });

  test('or', () => {
    const result = or(or(false, true, true), false);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Or(q.Or(false, true, true), false));
  });
});
