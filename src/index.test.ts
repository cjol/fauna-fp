import { query as q } from 'faunadb';
import { map, mapPage, mean, reduce } from './array';
import { length } from './string';
import { expectTypeOf } from 'expect-type';
import { Page, qAll, Query, Ref } from './types';
import { toTuple } from './tuple';
import { flow, pipe, tuple } from 'fp-ts/function';
import { iff } from './basic';
import { select } from './object';
import { gte, equals } from './logic';
import { get, index, paginate } from '.';
import { collection, ref } from './database';
import { match } from './set';

describe('misc', () => {
  const strArr = ['hello', 'world'];
  const boolArr = [true, true, false];
  const numArr = [42, 43, 45];

  // convoluted example: find the array with the longest average string length, and return the first string.
  // If it's 'HELLO' then return one thing, else return another (note different types are preserved)
  test('max avg string length', () => {
    const data = [strArr, strArr];
    const items = map(
      (x) =>
        qAll({
          len: mean(map(length, x)),
          arr: x,
        }),
      data
    );
    const greatest = reduce(
      (curr, next) => {
        const currLen = select(curr, 'len');
        const nextLen = select(next, 'len');
        return iff(gte([currLen, nextLen]), next, curr);
      },
      { len: 0, arr: [] as string[] },
      items
    );
    const first = select(greatest, 'arr', 0);
    const result = iff(equals(first, 'HELLO'), boolArr, numArr);

    expectTypeOf(result).toEqualTypeOf<Query<Array<number> | Array<boolean>>>();

    expect(result).toEqual(
      q.If(
        q.Equals(
          q.Select(
            ['arr', 0],
            q.Reduce(
              (curr: any, next: any) =>
                q.If(
                  q.GTE(q.Select(['len'], curr), q.Select(['len'], next)),
                  next,
                  curr
                ),
              { len: 0, arr: [] as string[] },
              q.Map(data, (item) => ({
                arr: item,
                len: q.Mean(q.Map(item, (item) => q.Length(item))),
              }))
            )
          ),
          'HELLO'
        ),
        boolArr,
        numArr
      )
    );
  });

  test('user comments', () => {
    interface User {
      name: string;
      email: string;
    }
    interface Comment {
      body: string;
      author: Ref<User>;
      replies: Array<Ref<Comment>>;
    }

    const usersCollection = collection<User>('users');
    const commentsByUser = index<Ref<Comment>, [Ref<User>, string]>(
      'tagged_comments_by_user'
    );
    const getUserComments = (id: string, tag: string) => {
      const commentsPage = paginate(
        match(commentsByUser, [ref(usersCollection, id), tag]),
        { size: 10 }
      );

      return mapPage((commentRef) => {
        const commentDoc = get(commentRef);
        const comment = select(commentDoc, 'data', 'body');
        const replyRefs = select(commentDoc, 'data', 'replies');
        return qAll({
          comment,
          replies: map(
            (reply) => select(get(reply), 'data', 'body'),
            replyRefs
          ),
        });
      }, commentsPage);
    };

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
            q.Ref(q.Collection('users'), '123456789'),
            'untagged'
          ),
          { size: 10 }
        ),
        (item) => ({
          comment: q.Select(['data', 'body'], q.Get(item)),
          replies: q.Map(q.Select(['data', 'replies'], q.Get(item)), (item) =>
            q.Select(['data', 'body'], q.Get(item))
          ),
        })
      )
    );
  });
});
