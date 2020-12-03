import { query as q } from 'faunadb';
import { expectTypeOf } from 'expect-type';
import { Arg, Query, time } from './types';
import { abort, at, call, doMany, iff, letVar } from './basic';
import { equals } from './logic';
import { fun } from './database';
import { flow, pipe, tuple } from 'fp-ts/lib/function';
import { length } from './string';
import { add } from './number';

describe('control flow', () => {
  test('abort', () => {
    const result = abort('something went wrong');
    expectTypeOf(result).toEqualTypeOf<Query<never>>();
    expect(result).toEqual(q.Abort('something went wrong'));
  });

  test('iff', () => {
    const result = iff(true, 'yes', 0);
    expectTypeOf(result).toEqualTypeOf<Query<string | number>>();

    const abortiveResult = iff(true, 'yes', abort('something went wrong'));
    expectTypeOf(abortiveResult).toEqualTypeOf<Query<string>>();
    expect(abortiveResult).toEqual(
      q.If(true, 'yes', q.Abort('something went wrong'))
    );
  });

  test('equals', () => {
    const result = equals(5, 4);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Equals(5, 4));
  });

  test('at', () => {
    const t = '1970-01-01T00:00:00Z';
    const result = at(time(t), { name: 'cjol' });
    expectTypeOf(result).toEqualTypeOf<Query<{ name: string }>>();
    expect(result).toEqual(q.At(q.Time(t), { name: 'cjol' }));
  });

  test('call', () => {
    const f = fun<[string, string], number>('combine_strings_to_form_number');
    const result = call(f, ['hello', 'world']);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(
      q.Call(q.Function('combine_strings_to_form_number'), 'hello', 'world')
    );
  });

  test('doMany', () => {
    const result = doMany('hello', 'world', true);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Do('hello', 'world', true));
  });

  test('letVar', () => {
    const getLengthPlusTwo = (x: Arg<string>) =>
      letVar(length(x), (len) => letVar(2, (constant) => add([constant, len])));

    const result = getLengthPlusTwo('hello');

    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(
      q.Let(
        { len: q.Length('hello') },
        q.Let({ constant: 2 }, q.Add(q.Var('constant'), q.Var('len')))
      )
    );
  });
});
