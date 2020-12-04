import { ExprArg, query as q } from 'faunadb';
import { map, mean, reduce } from './array';
import { containsStrRegex, length } from './string';
import { expectTypeOf } from 'expect-type';
import { Arg, Page, Query, Ref } from './types';
import { flow, pipe } from 'fp-ts/function';
import { abort, iff } from './basic';
import { select } from './object';
import { gte, equals } from './logic';
import { create, get, index, paginate } from '.';
import { collection, ref } from './database';
import { match } from './set';

describe('misc', () => {
  const strArr = ['hello', 'world'];
  const boolArr = [true, true, false];
  const numArr = [42, 43, 45];

  // convoluted example: find the array with the longest average string length, and return the first string.
  // If it's 'HELLO' then return one thing, else return another (note different types are preserved)
  test('max avg string length', () => {
    const data: Page<string[]> = { data: [strArr, strArr] };
    const items = pipe(
      data,
      map(
        (x) => ({
          len: pipe(x, map(length), mean),
          arr: x,
        }),
      ));
    const greatest = reduce(
      (curr, next) => {
        const currLen = select(curr, 'len');
        const nextLen = select(next, 'len');
        const myBool = gte([currLen, nextLen]);
        return iff(myBool, next, curr);
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
      const userRef = ref(usersCollection, id);
      const m = match(commentsByUser, [userRef, tag]);
      const commentsPage = paginate(m, { size: 10 });

      return map((commentRef) => {
        const commentDoc = get(commentRef);
        const comment = select(commentDoc, 'data', 'body');
        const replyRefs = select(commentDoc, 'data', 'replies');
        return {
          comment,
          replies: map(
            (reply) => select(get(reply), 'data', 'body'),
            replyRefs
          ),
        };
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

  test('user registration', () => {
    interface User {
      email: string;
      password: string;
    }

    const emailValidator = (x: Arg<User>) =>
      containsStrRegex('^.+@.+..+$', select(x, 'email'));
    const passwordValidator = (x: Arg<User>) =>
      gte([8, length(select(x, 'password'))]);

    const validate = <T>(f: (x: Arg<T>) => Query<boolean>) => (x: Arg<T>) =>
      iff(f(x), x, abort('invalid data'));

    const usersCollection = collection<User>('users');

    const register = flow(
      validate(emailValidator),
      validate(passwordValidator),
      (x) => create(usersCollection, { data: x })
    );

    const newUser = register({ email: '', password: '' });
    const insertedEmail = select(newUser, 'data', 'email');

    expectTypeOf(insertedEmail).toEqualTypeOf<Query<string>>();

    const Validator = (f: (x: ExprArg) => ExprArg) => (x: ExprArg) =>
      q.If(f(x), x, q.Abort('invalid data'));

    const PasswordValidator = Validator((x) =>
      q.GTE([8, q.Length(q.Select(['password'], x))])
    );

    const EmailValidator = Validator((x) =>
      q.ContainsStrRegex(q.Select(['email'], x), '^.+@.+..+$')
    );

    const Register = (x: User) =>
      q.Create(q.Collection('users'), {
        data: PasswordValidator(EmailValidator(x)),
      });

    const NewUser = Register({ email: '', password: '' });

    const Email = q.Select(['data', 'email'], NewUser);

    expect(insertedEmail).toEqual(Email);

    // @ts-expect-error
    register({ password: '' });
  });
});
