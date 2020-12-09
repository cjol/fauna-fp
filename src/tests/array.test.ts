import { expectTypeOf } from "expect-type";
import { Expr, query as q } from "faunadb";
import { pipe } from "fp-ts/function";
import * as fns from "../fns";
import { Arg, Page, Query } from "../types";

describe("array", () => {
  const strArr = ["hello", "world"];
  const boolArr = [true, true, false];
  const numArr = [42, 43, 45];
  const strPage: Page<string> = { data: ["one", "two"] };

  test("all", () => {
    const result = fns.all(boolArr);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.All(boolArr));
    // @ts-expect-error all expects a boolean array
    fns.all(strArr), fns.all(true);
  });

  test("any", () => {
    const result = fns.any(boolArr);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Any(boolArr));
    // @ts-expect-error any expects a boolean array
    fns.any(strArr), fns.any(true);
  });

  test("append", () => {
    const result = fns.append([1, 2, 3], numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();

    const fql = q.Append([1, 2, 3], numArr);
    expect(result).toEqual(fql);
    // @ts-expect-error arrays must be the same type
    fns.append(numArr, strArr);
    // @ts-expect-error must pass arrays
    fns.append(12, 4);
  });

  test("count", () => {
    const result = fns.count(strArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Count(strArr));
    // @ts-expect-error must pass an array
    pipe("hello", fns.count);
  });

  test("difference", () => {
    const result = fns.difference(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      numArr
    );
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    const fql = q.Difference(numArr, [1, 2, 3], [4, 5, 6]);
    expect(result).toEqual(fql);
  });

  test("distinct", () => {
    const result = fns.distinct(strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Distinct(strArr));
  });

  test("drop", () => {
    const result = fns.drop(5, strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Drop(5, strArr));
  });

  test("take", () => {
    const result = fns.take(5, strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Take(5, strArr));
  });

  test("toObject", () => {
    const data: [string, string][] = [
      ["foo", "bar"],
      ["fop", "bap"],
    ];
    const result = fns.toObject(data);
    expectTypeOf(result).toEqualTypeOf<Query<Record<string, string>>>();
    expect(result).toEqual(q.ToObject(data));
  });

  test("filter", () => {
    const result = fns.filter((b: Arg<string>) => fns.equals("hello", b), strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Filter(strArr, (item) => q.Equals("hello", item)));
  });

  test("filter page", () => {
    const result = fns.filter((b: Arg<string>) => fns.equals("hello", b), strPage);
    expectTypeOf(result).toEqualTypeOf<Query<Page<string>>>();
    expect(result).toEqual(q.Filter(strPage, (item) => q.Equals("hello", item)));
  });

  test("filter call", () => {
    const f = fns.fun<[string], boolean>("foo");
    const filtered = fns.filter((x) => fns.call(f, [x]), strArr);
    expectTypeOf(filtered).toEqualTypeOf<Query<string[]>>();
    const fql = q.Filter(strArr, (item) => q.Call(q.Function("foo"), item));
    expect(filtered).toEqual(fql);
  });

  test("foreach", () => {
    const result = fns.foreach((x) => fns.length(x), strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Foreach(strArr, (item) => q.Length(item)));
  });

  test("intersection", () => {
    const result = fns.intersection([1, 2, 3], [4, 5, 6], numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Intersection([1, 2, 3], [4, 5, 6], numArr));
  });

  test("union", () => {
    const result = fns.union([1, 2, 3], [4, 5, 6], numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Union([1, 2, 3], [4, 5, 6], numArr));
  });

  test("isEmpty", () => {
    const result = fns.isEmpty(boolArr);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.IsEmpty(boolArr));
  });

  test("isNonEmpty", () => {
    const result = fns.isNonEmpty(boolArr);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.IsNonEmpty(boolArr));
  });

  test("map", () => {
    const data = strArr;
    const result = fns.map(fns.length, data);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Map(data, (item) => q.Length(item)));
  });

  test("map page", () => {
    const data = strPage;
    const result = fns.map(fns.length, data);
    expectTypeOf(result).toEqualTypeOf<Query<Page<number>>>();
    expect(result).toEqual(q.Map(data, (item) => q.Length(item)));
  });

  test("max", () => {
    const result = fns.max(numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Max(numArr));
    // @ts-expect-error must pass an array of numbers
    fns.max(strArr);
  });

  test("min", () => {
    const result = fns.min(numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Min(numArr));
    // @ts-expect-error must pass an array of numbers
    fns.min(strArr);
  });

  test("sum", () => {
    const result = fns.sum(numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Sum(numArr));
    // @ts-expect-error must pass an array of numbers
    fns.sum(strArr);
  });

  test("prepend", () => {
    const result = fns.prepend([1, 2, 3], numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Prepend([1, 2, 3], numArr));
  });

  test("reduce", () => {
    const result = fns.reduce((x, y) => fns.add([x, y]), 0 as number, numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Reduce((curr: Expr, next: Expr) => q.Add(curr, next), 0, numArr));
  });

  test("reverse", () => {
    const result = fns.reverse(strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Reverse(strArr));
  });

  test("reverse page", () => {
    const result = fns.reverse(strPage);
    expectTypeOf(result).toEqualTypeOf<Query<Page<string>>>();
    expect(result).toEqual(q.Reverse(strPage));
  });
});
