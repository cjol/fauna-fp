import { query as q } from "faunadb";
import { expectTypeOf } from "expect-type";
import { merge, select, selectDefault, toArray } from "./object";
import { Arg, Query } from "./types";

describe("object", () => {
  test("select", () => {
    const data = { foo: { bar: { zim: true }, baz: null } };
    const intermediate = select(data, "foo", "bar");
    const result = selectDefault(intermediate, null, "zim");

    const input: Arg<{ name: string }> = { name: "hello" };
    const r = select(input, "name");

    expectTypeOf(result).toEqualTypeOf<Query<boolean | null>>();
    expect(result).toEqual(
      q.Select(["zim"], q.Select(["foo", "bar"], data), null as any)
    );
  });

  test("merge", () => {
    const data = merge(
      { foo: true },
      { bar: false },
      (key, aVal, bVal) => aVal
    );
    expectTypeOf(data).toEqualTypeOf<Query<{ foo: boolean; bar: boolean }>>();
    expect(data).toEqual(
      q.Merge(
        { foo: true },
        { bar: false },
        q.Lambda(["key", "aVal", "bVal"], q.Var("aVal"))
      )
    );
  });

  test("toArray", () => {
    const arr = toArray({ foo: true, bar: "hello" });
    expectTypeOf(arr).toEqualTypeOf<
      Query<Array<["foo", boolean] | ["bar", string]>>
    >();
  });
});
