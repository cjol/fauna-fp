import { expectTypeOf } from "expect-type";
import { Expr, ExprArg, query as q } from "faunadb";
import { flow } from "fp-ts/lib/function";
import * as fns from "../fns";
import { Arg, DocRef, Page, Query, Document } from "../types";

describe("misc", () => {
  const strArr = ["hello", "world"];
  const boolArr = [true, true, false];
  const numArr = [42, 43, 45];

  // convoluted example: find the array with the longest average string length, and return the first string.
  // If it's 'HELLO' then return one thing, else return another (note different types are preserved)
  test("max avg string length", () => {
    const data: Page<string[]> = { data: [strArr, strArr] };
    const items = fns.map(
      (xs) => ({
        len: fns.mean(fns.map((x) => fns.length(x), xs)),
        arr: xs,
      }),
      data
    );
    const greatest = fns.reduce(
      (curr, next) => {
        const currLen = fns.select(curr, "len");
        const nextLen = fns.select(next, "len");
        const myBool = fns.gte([currLen, nextLen]);
        return fns.iff(myBool, next, curr);
      },
      { len: 0, arr: [] as string[] },
      items
    );
    const first = fns.select(greatest, "arr", 0);
    const result = fns.iff(fns.equals(first, "HELLO"), boolArr, numArr);

    expectTypeOf(result).toEqualTypeOf<Query<Array<number>> | Query<Array<boolean>>>();

    expect(result).toEqual(
      q.If(
        q.Equals(
          q.Select(
            ["arr", 0],
            q.Reduce(
              (curr: Expr, next: Expr) =>
                q.If(q.GTE(q.Select(["len"], curr), q.Select(["len"], next)), next, curr),
              { len: 0, arr: [] as string[] },
              q.Map(data, (item) => ({
                arr: item,
                len: q.Mean(q.Map(item, (item) => q.Length(item))),
              }))
            )
          ),
          "HELLO"
        ),
        boolArr,
        numArr
      )
    );
  });

  test("user comments", () => {
    interface User {
      name: string;
      email: string;
    }
    interface Comment {
      body: string;
      author: DocRef<User>;
      replies: Array<DocRef<Comment>>;
    }

    const usersCollection = fns.collection<User>("users");
    const commentsByUser = fns.index<[DocRef<User>, string], [DocRef<Comment>], Document<Comment>>(
      "tagged_comments_by_user"
    );
    const getUserComments = (id: string, tag: string) => {
      const userRef = fns.ref(usersCollection, id);
      const m = fns.match(commentsByUser, [userRef, tag]);
      const commentsPage = fns.paginate({ size: 10 }, m);

      return fns.map((commentRef) => {
        const commentDoc = fns.get(fns.select(commentRef, 0));
        const comment = fns.select(commentDoc, "data", "body");
        const replyRefs = fns.select(commentDoc, "data", "replies");
        return {
          comment,
          replies: fns.map((reply) => fns.select(fns.get(reply), "data", "body"), replyRefs),
        };
      }, commentsPage);
    };

    const comments = getUserComments("123456789", "untagged");
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
            q.Index("tagged_comments_by_user"),
            q.Ref(q.Collection("users"), "123456789"),
            "untagged"
          ),
          {
            size: 10,
          }
        ),
        (item) => ({
          comment: q.Select(["data", "body"], q.Get(q.Select([0], item))),
          replies: q.Map(q.Select(["data", "replies"], q.Get(q.Select([0], item))), (item) =>
            q.Select(["data", "body"], q.Get(item))
          ),
        })
      )
    );
  });

  test("user registration", () => {
    interface User {
      email: string;
      password: string;
    }

    const emailValidator = (x: Arg<User>) =>
      fns.containsStrRegex("^.+@.+..+$", fns.select(x, "email"));
    const passwordValidator = (x: Arg<User>) => fns.gte([8, fns.length(fns.select(x, "password"))]);

    const validate = <T>(f: (x: Arg<T>) => Query<boolean>) => (x: Arg<T>) =>
      fns.iff(f(x), x, fns.abort("invalid data"));

    const usersCollection = fns.collection<User>("users");

    const register = flow(validate(emailValidator), validate(passwordValidator), (x) =>
      fns.create(usersCollection, { data: x })
    );

    const newUser = register({ email: "", password: "" });
    const insertedEmail = fns.select(newUser, "data", "email");

    expectTypeOf(insertedEmail).toEqualTypeOf<Query<string>>();

    const Validator = (f: (x: ExprArg) => ExprArg) => (x: ExprArg) =>
      q.If(f(x), x, q.Abort("invalid data"));

    const PasswordValidator = Validator((x) => q.GTE([8, q.Length(q.Select(["password"], x))]));

    const EmailValidator = Validator((x) =>
      q.ContainsStrRegex(q.Select(["email"], x), "^.+@.+..+$")
    );

    const Register = (x: User) =>
      q.Create(q.Collection("users"), {
        data: PasswordValidator(EmailValidator(x)),
      });

    const NewUser = Register({ email: "", password: "" });

    const Email = q.Select(["data", "email"], NewUser);

    expect(insertedEmail).toEqual(Email);

    // @ts-expect-error no email is provided
    register({ password: "" });
  });
});
