import { query as q } from 'faunadb';
import { expectTypeOf } from 'expect-type';
import { merge, select, selectDefault, toArray } from './object';
import { Arg, Query } from './types';
import { pipe } from 'fp-ts/lib/function';
import { or } from './logic';

describe('object', () => {
  test('select', () => {
    const data = { foo: { bar: { zim: true }, baz: null } };
    const intermediate = select(data, 'foo', 'bar');
    const intermediate2 = pipe(data, select('foo', 'bar'));
    expect(intermediate).toEqual(intermediate2);
    const result = selectDefault(null, 'zim')(intermediate);
    expectTypeOf(result).toEqualTypeOf<Query<boolean | null>>();
    expect(result).toEqual(
      q.Select(['zim'], q.Select(['foo', 'bar'], data), null as any)
    );
  });

  test('merge', () => {
    const one = { foo: true };
    const two = { bar: false };
    type Merged = { foo: boolean; bar: boolean };

    const data1 = merge(one, two);
    const data2 = merge(one)(two);
    expectTypeOf(data1).toEqualTypeOf<Query<Merged>>();
    expectTypeOf(data2).toEqualTypeOf<Query<Merged>>();
    expect(data2).toEqual(data1);
    expect(data1).toEqual(q.Merge(one, two));

    const withResolver1 = merge((key, aVal, bVal) => aVal, one, two);
    const withResolver2 = merge((key, aVal, bVal) => aVal, one)(two);
    const withResolver3 = merge((key, aVal, bVal) => aVal)(one)(two);
    const withResolver4 = merge((key, aVal, bVal) => aVal)(one, two);

    expectTypeOf(withResolver1).toEqualTypeOf<Query<Merged>>();
    expectTypeOf(withResolver2).toEqualTypeOf<Query<Merged>>();
    expectTypeOf(withResolver3).toEqualTypeOf<Query<Merged>>();
    expectTypeOf(withResolver4).toEqualTypeOf<Query<Merged>>();
    const fqlWithResolver = q.Merge(
      { foo: true },
      { bar: false },
      q.Lambda(['key', 'aVal', 'bVal'], q.Var('aVal'))
    );
    expect(withResolver2).toEqual(fqlWithResolver);
    expect(withResolver3).toEqual(fqlWithResolver);
    expect(withResolver4).toEqual(fqlWithResolver);
    expect(withResolver1).toEqual(fqlWithResolver);

    // check that everything works well with a typed resolver
    const mergeOr = merge((x, a: Arg<boolean>, b: Arg<boolean>) => or(a, b));
    mergeOr({ foo: true }, { bar: false });
    mergeOr({ foo: true })({ bar: false });
    //@ts-expect-error
    mergeOr({ foo: true }, { bar: 'false' });
    //@ts-expect-error
    mergeOr({ foo: true })({ bar: 'false' });
  });

  test('toArray', () => {
    const arr = toArray({ foo: true, bar: 'hello' });
    expectTypeOf(arr).toEqualTypeOf<
      Query<Array<['foo', boolean] | ['bar', string]>>
    >();
  });
});
