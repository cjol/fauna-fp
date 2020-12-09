import { query as q } from "faunadb";
import { expectTypeOf } from "expect-type";
import * as fns from "../fns";
import { Query } from "../types";

describe("object", () => {
  test("select", () => {
    const data = { foo: { bar: { zim: true }, baz: null } };
    const intermediate = fns.select(data, "foo", "bar");
    expect(intermediate).toEqual(intermediate);
    const result = fns.selectDefault(intermediate, null, "zim");
    expectTypeOf(result).toEqualTypeOf<Query<boolean | null>>();
  });

  test("merge", () => {
    const one = { foo: true };
    const two = { bar: false };
    type Merged = { foo: boolean; bar: boolean };

    const data1 = fns.merge(one, two);
    expectTypeOf(data1).toEqualTypeOf<Query<Merged>>();
    expect(data1).toEqual(q.Merge(one, two));

    const withResolver1 = fns.merge(one, two, (key, aVal) => aVal);

    expectTypeOf(withResolver1).toEqualTypeOf<Query<Merged>>();
    const fqlWithResolver = q.Merge(
      { foo: true },
      { bar: false },
      q.Lambda(["key", "aVal"], q.Var("aVal"))
    );
    expect(withResolver1).toEqual(fqlWithResolver);
  });

  test("toArray", () => {
    const arr = fns.toArray({ foo: true, bar: "hello" });
    expectTypeOf(arr).toEqualTypeOf<Query<Array<["foo", boolean] | ["bar", string]>>>();
  });
});
