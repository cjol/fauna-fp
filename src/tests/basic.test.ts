import { query as q } from "faunadb";
import { expectTypeOf } from "expect-type";
import { Arg, DocRef, Match, Query, Document } from "../types";
import * as fns from "../fns";

describe("control flow", () => {
  test("abort", () => {
    const result = fns.abort("something went wrong");
    expectTypeOf(result).toEqualTypeOf<Query<never>>();
    expect(result).toEqual(q.Abort("something went wrong"));
  });

  test("iff", () => {
    const result = fns.iff(true, "yes", 0);
    expectTypeOf(result).toEqualTypeOf<Query<"yes"> | Query<0>>();

    const abortiveResult = fns.iff(true, "yes", fns.abort("something went wrong"));
    expectTypeOf(abortiveResult).toEqualTypeOf<Query<"yes">>();
    expect(abortiveResult).toEqual(q.If(true, "yes", q.Abort("something went wrong")));
  });

  test("equals", () => {
    const result = fns.equals(5, 4);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Equals(5, 4));
  });

  test("at", () => {
    const t = "1970-01-01T00:00:00Z";
    const result = fns.at(fns.time(t), { name: "cjol" });
    expectTypeOf(result).toEqualTypeOf<Query<{ name: string }>>();
    expect(result).toEqual(q.At(q.Time(t), { name: "cjol" }));
  });

  test("call", () => {
    const f = fns.fun<[string, string], number>("combine_strings_to_form_number");
    const result = fns.call(f, ["hello", "world"]);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Call(q.Function("combine_strings_to_form_number"), "hello", "world"));
  });

  test("doMany", () => {
    const result = fns.doMany("hello", "world", true);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Do("hello", "world", true));
  });

  test("letVar", () => {
    const getLengthPlusTwo = (x: Arg<string>) =>
      fns.letVar(fns.length(x), (len) => fns.letVar(2, (constant) => fns.add([constant, len])));

    const result = getLengthPlusTwo("hello");

    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(
      q.Let(
        { len: q.Length("hello") },
        q.Let({ constant: 2 }, q.Add(q.Var("constant"), q.Var("len")))
      )
    );
  });

  test("join", () => {
    interface Foo {
      name: string;
    }
    interface Bar {
      barname: string;
    }
    const fooIndex = fns.index<[], [DocRef<Foo>]>("index_one");
    const barByFooIndex = fns.index<[DocRef<Foo>], [DocRef<Bar>]>("index_two");

    const result = fns.join(fns.match(fooIndex, []), barByFooIndex);
    expectTypeOf(result).toEqualTypeOf<Query<Match<[DocRef<Bar>, Document<Bar>]>>>();
    expect(result).toEqual(q.Join(q.Match(q.Index("index_one"), []), q.Index("index_two")));
  });

  test("join (lambda)", () => {
    interface Foo {
      name: string;
    }
    interface Bar {
      barname: string;
    }
    const fooIndex = fns.index<[], [DocRef<Foo>]>("index_one");
    const barByFooIndex = fns.index<[DocRef<Foo>], [DocRef<Bar>]>("index_two");

    const result = fns.join(fns.match(fooIndex, []), (foo) => fns.match(barByFooIndex, [foo]));
    expectTypeOf(result).toEqualTypeOf<Query<Match<[DocRef<Bar>]>>>();
    expect(result).toEqual(
      q.Join(q.Match(q.Index("index_one"), []), (foo) => q.Match(q.Index("index_two"), foo))
    );
  });
});
