import { query as q } from 'faunadb';
import { expectTypeOf } from 'expect-type';
import { Query, time } from './types';
import { abort, at, call, doMany, equals, getVar, iff, letVar } from './basic';
import { fun } from './database';
import { flow, pipe } from 'fp-ts/lib/function';
import { length } from './string';
import { add } from './number';

describe('control flow', () => {
  test('abort', () => {
    const result = abort('something went wrong');
    expectTypeOf(result).toEqualTypeOf<Query<never>>();
    expect(result).toEqual(q.Abort('something went wrong'));
  });

  test('iff', () => {
    const doIf = iff('yes', 0);
    const result = doIf(true);
    expectTypeOf(result).toEqualTypeOf<Query<string | number>>();

    const abortingIf = iff('yes', abort('something went wrong'));
    const abortiveResult = abortingIf(true);
    expectTypeOf(abortiveResult).toEqualTypeOf<Query<string>>();
    expect(abortiveResult).toEqual(
      q.If(true, 'yes', q.Abort('something went wrong'))
    );
  });

  test('equals', () => {
    const equals5 = equals(5);
    const result = equals5(4);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Equals(5, 4));
  });

  test('at', () => {
    const t = '1970-01-01T00:00:00Z';
    const doAt = at(time(t));
    const result = doAt({ name: 'cjol' });
    expectTypeOf(result).toEqualTypeOf<Query<{ name: string }>>();
    expect(result).toEqual(q.At(q.Time(t), { name: 'cjol' }));
  });

  test('call', () => {
    const f = fun<[string, string], number>('combine_strings_to_form_number');
    const callF = call(f);
    const result = callF(['hello', 'world']);
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

  test('letVar and getVar', () => {
    const getLengthPlusTwo = flow(
      length,
      (len) => ({ len, constant: 2 }),
      letVar(pipe(getVar<number>('len'), add(getVar('constant'))))
    );
    const result = getLengthPlusTwo('hello');

    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(
      q.Let(
        {
          len: q.Length('hello'),
          constant: 2,
        },
        q.Add(q.Var('constant'), q.Var('len'))
      )
    );
  });
});
