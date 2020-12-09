import { query as q } from "faunadb";
import { expectTypeOf } from "expect-type";
import { Query } from "../types";
import * as fns from "../fns";
import { pipe } from "fp-ts/lib/function";

describe("control flow", () => {
  test("and", () => {
    const result = fns.and(fns.and(false, true, true), false);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.And(q.And(false, true, true), false));
  });

  test("containsField", () => {
    const result = fns.containsField("foo", { foo: [{ bar: 1 }] });
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.ContainsField("foo", { foo: [{ bar: 1 }] }));
  });

  test("containsPath", () => {
    const result = fns.containsPath(["foo", 0, "bar"], { foo: [{ bar: 1 }] });
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.ContainsPath(["foo", 0, "bar"], { foo: [{ bar: 1 }] }));
  });

  test("containsValue", () => {
    const result = fns.containsValue(3, { a: 1, b: 2, c: 3 });
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(
      q.ContainsValue(3, {
        a: 1,
        b: 2,
        c: 3,
      })
    );
  });

  test("equals", () => {
    const result = fns.equals(5, 4);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Equals(5, 4));
  });

  test("exists", () => {
    const result = fns.exists(fns.ref(fns.collection("my_foos"), "123"));
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Exists(q.Ref(q.Collection("my_foos"), "123")));
  });

  test("gt", () => {
    const result = fns.gt([fns.add([3, 3]), 5]);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.GT([q.Add([3, 3]), 5]));
  });

  test("gte", () => {
    const result = fns.gte([fns.add([3, 3]), 5]);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.GTE([q.Add([3, 3]), 5]));
  });

  test("lt", () => {
    const result = fns.lt([fns.add([3, 3]), 5]);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.LT([q.Add([3, 3]), 5]));
  });

  test("lte", () => {
    const result = fns.lte([fns.add([3, 3]), 5]);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.LTE([q.Add([3, 3]), 5]));
  });

  test("not", () => {
    const result = pipe(true, fns.not, fns.not);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Not(q.Not(true)));
  });

  test("or", () => {
    const result = fns.or(fns.or(false, true, true), false);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Or(q.Or(false, true, true), false));
  });
});
