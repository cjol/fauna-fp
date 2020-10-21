import { query as q } from 'faunadb';
import { map, mapPage, mean, reduce } from './array';
import { length } from './string';
import { expectTypeOf } from 'expect-type';
import { Page, Query, Ref } from './types';
import { toTuple } from './tuple';
import { flow, pipe } from 'fp-ts/function';
import { equals, iff } from './basic';
import { select } from './object';
import { gte } from './number';
import { get, index, match, paginate } from '.';
import { collection, ref } from './database';

describe('misc', () => {
  const strArr = ['hello', 'world'];
  const boolArr = [true, true, false];
  const numArr = [42, 43, 45];

  // convoluted example: find the array with the longest average string length, and return the first string.
  // If it's 'HELLO' then return one thing, else return another (note different types are preserved)
  test('max avg string length', () => {
    const data = [strArr, strArr];
    const getLen = select('len');
    const result = pipe(
      data,
      map((x) => ({
        len: pipe(x, map(length), mean),
        arr: x,
      })),
      reduce(
        (curr, next) => pipe(gte(getLen(curr), getLen(next)), iff(curr, next)),
        { len: 0, arr: [] as string[] }
      ),
      select('arr', 0),
      equals('HELLO'),
      iff(boolArr, numArr)
    );

    expectTypeOf(result).toEqualTypeOf<Query<Array<number> | Array<boolean>>>();

    expect(result).toEqual(
      q.If(
        q.Equals(
          'HELLO',
          q.Select(
            ['arr', 0],
            q.Reduce(
              (curr: any, next: any) =>
                q.If(
                  q.GTE(q.Select(['len'], curr), q.Select(['len'], next)),
                  curr,
                  next
                ),
              { len: 0, arr: [] as string[] },
              q.Map(data, (item) => ({
                arr: item,
                len: q.Mean(q.Map(item, (item) => q.Length(item))),
              }))
            )
          )
        ),
        boolArr,
        numArr
      )
    );
  });

  test('user comments', () => {
    interface User {
      ref: Ref<User>;
      data: {
        name: string;
        email: string;
      };
    }
    interface Comment {
      data: {
        body: string;
        author: Ref<User>;
        replies: Array<Ref<Comment>>;
      };
    }

    const usersCollection = collection<User>('users');
    const commentsByUser = index<Comment, [Ref<User>, string]>(
      'tagged_comments_by_user'
    );

    const getUserComments = (id: string, tag: string) =>
      pipe(
        id,
        ref(usersCollection),
        get,
        select('ref'),
        toTuple(tag),
        match(commentsByUser),
        paginate({ size: 10 }),
        mapPage((comment) => ({
          comment: select('data', 'body')(comment),
          replies: pipe(
            comment,
            select('data', 'replies'),
            map(flow(get, select('data', 'body')))
          ),
        }))
      );

    const comments = getUserComments('123456789', 'untagged');
    expectTypeOf(comments).toEqualTypeOf<
      Query<
        Page<{
          comment: string;
          replies: string[];
        }>
      >
    >();

    expect(comments).toEqual(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index('tagged_comments_by_user'),
            q.Select(['ref'], q.Get(q.Ref(q.Collection('users'), '123456789'))),
            'untagged'
          ),
          { size: 10 }
        ),
        (item) => ({
          comment: q.Select(['data', 'body'], item),
          replies: q.Map(q.Select(['data', 'replies'], item), (item) =>
            q.Select(['data', 'body'], q.Get(item))
          ),
        })
      )
    );
  });
});
