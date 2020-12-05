import { expectTypeOf } from "expect-type";
import { query as q } from "faunadb";
import { pipe } from "fp-ts/function";
import { all } from "./all";
import { any } from "./any";
import { append } from "./append";
import { call } from "./call";
import { count } from "./count";
import { fun } from "./fun";
import { difference } from "./difference";
import { distinct } from "./distinct";
import { drop } from "./drop";
import { filter } from "./filter";
import { foreach } from "./foreach";
import { intersection } from "./intersection";
import { isEmpty } from "./isEmpty";
import { isNonEmpty } from "./isNonEmpty";
import { equals } from "./equals";
import { map } from "./map";
import { max } from "./max";
import { mean } from "./mean";
import { min } from "./min";
import { add } from "./add";
import { prepend } from "./prepend";
import { reduce } from "./reduce";
import { reverse } from "./reverse";
import { length } from "./length";
import { sum } from "./sum";
import { take } from "./take";
import { toObject } from "./toObject";
import { Arg, Page, Query } from "./types";
import { union } from "./union";

describe("array", () => {
  const strArr = ["hello", "world"];
  const boolArr = [true, true, false];
  const numArr = [42, 43, 45];
  const numPage = { data: numArr };
  const strPage: Page<string> = { data: ["one", "two"] };

  test("all", () => {
    const result = all(boolArr);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.All(boolArr));
    // @ts-expect-error
    all(strArr), all(true);
  });

  test("any", () => {
    const result = any(boolArr);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.Any(boolArr));
    // @ts-expect-error
    any(strArr), any(true);
  });

  test("append", () => {
    const result = append([1, 2, 3], numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();

    const resultC = append([1, 2, 3])(numArr);
    expectTypeOf(resultC).toEqualTypeOf<Query<number[]>>();

    const fql = q.Append([1, 2, 3], numArr);
    expect(result).toEqual(fql);
    expect(resultC).toEqual(fql);
    // @ts-expect-error
    append(numArr, strArr);
    // @ts-expect-error
    append(numArr)(strArr);
    // @ts-expect-error
    append(12, 4);
  });

  test("count", () => {
    const result = count(strArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Count(strArr));
    // @ts-expect-error
    pipe("hello", count);
  });

  test("difference", () => {
    const result = difference(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      numArr
    );
    const resultC = difference([
      [1, 2, 3],
      [4, 5, 6],
    ])(numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expectTypeOf(resultC).toEqualTypeOf<Query<number[]>>();
    const fql = q.Difference(numArr, [1, 2, 3], [4, 5, 6]);
    expect(result).toEqual(fql);
    expect(resultC).toEqual(fql);
  });

  test("distinct", () => {
    const result = distinct(strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Distinct(strArr));
  });

  test("drop", () => {
    const result = drop(5, strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Drop(5, strArr));
  });

  test("drop curried page", () => {
    const result = drop(5)(strPage);
    expectTypeOf(result).toEqualTypeOf<Query<Page<string>>>();
    expect(result).toEqual(q.Drop(5, strPage));
  });

  test("take", () => {
    const result = take(5, strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Take(5, strArr));
  });

  test("take curried page", () => {
    const result = take(5)(strPage);
    expectTypeOf(result).toEqualTypeOf<Query<Page<string>>>();
    expect(result).toEqual(q.Take(5, strPage));
  });

  test("toObject", () => {
    const data: [string, string][] = [
      ["foo", "bar"],
      ["fop", "bap"],
    ];
    const result = toObject(data);
    expectTypeOf(result).toEqualTypeOf<Query<Record<string, string>>>();
    expect(result).toEqual(q.ToObject(data));
  });

  test("filter", () => {
    const result = filter((b: Arg<string>) => equals("hello", b), strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Filter(strArr, (item) => q.Equals("hello", item)));
  });

  test("filter page", () => {
    const result = filter((b: Arg<string>) => equals("hello", b), strPage);
    expectTypeOf(result).toEqualTypeOf<Query<Page<string>>>();
    expect(result).toEqual(q.Filter(strPage, (item) => q.Equals("hello", item)));
  });

  test("filter curried", () => {
    const result = pipe(strArr, filter(equals("hello" as string)));
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Filter(strArr, (item) => q.Equals("hello", item)));
  });

  test("filter curried page", () => {
    const result = pipe(strPage, filter(equals("hello" as string)));
    expectTypeOf(result).toEqualTypeOf<Query<Page<string>>>();
    expect(result).toEqual(q.Filter(strPage, (item) => q.Equals("hello", item)));
  });

  test("filter call", () => {
    const f = fun<[string], boolean>("foo");
    const filtered = pipe(strArr, filter(call(f)));
    expectTypeOf(filtered).toEqualTypeOf<Query<string[]>>();
    const fql = q.Filter(strArr, (item) => q.Call(q.Function("foo"), item));
    expect(filtered).toEqual(fql);
  });

  test("foreach", () => {
    const result = foreach(length, strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Foreach(strArr, (item) => q.Length(item)));
  });

  test("foreach curried", () => {
    const result = foreach(length)(strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Foreach(strArr, (item) => q.Length(item)));
  });

  test("intersection", () => {
    const result = intersection([1, 2, 3], [4, 5, 6], numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Intersection([1, 2, 3], [4, 5, 6], numArr));
  });

  test("union", () => {
    const result = union([1, 2, 3], [4, 5, 6], numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Union([1, 2, 3], [4, 5, 6], numArr));
  });

  test("isEmpty", () => {
    const result = isEmpty(boolArr);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.IsEmpty(boolArr));
  });

  test("isNonEmpty", () => {
    const result = isNonEmpty(boolArr);
    expectTypeOf(result).toEqualTypeOf<Query<boolean>>();
    expect(result).toEqual(q.IsNonEmpty(boolArr));
  });

  test("map", () => {
    const data = strArr;
    const result = map(length, data);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Map(data, (item) => q.Length(item)));
  });

  test("map curried (open iterator)", () => {
    const data = strArr;
    const mapLength = map(length);
    const result = mapLength(data);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Map(data, (item) => q.Length(item)));
  });

  test("map curried (fixed iterator)", () => {
    const data = strArr;
    const result = pipe(
      data,
      map((x) => length(x)),
      mean
    );
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Mean(q.Map(data, (item) => q.Length(item))));
  });

  test("map page", () => {
    const data = strPage;
    const result = map(length, data);
    expectTypeOf(result).toEqualTypeOf<Query<Page<number>>>();
    expect(result).toEqual(q.Map(data, (item) => q.Length(item)));
  });

  test("max", () => {
    const result = max(numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Max(numArr));
    // @ts-expect-error
    max(strArr);
  });

  test("min", () => {
    const result = min(numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Min(numArr));
    // @ts-expect-error
    min(strArr);
  });

  test("sum", () => {
    const result = sum(numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Sum(numArr));
    // @ts-expect-error
    sum(strArr);
  });

  test("prepend", () => {
    const result = prepend([1, 2, 3], numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Prepend([1, 2, 3], numArr));
  });

  test("prepend curried", () => {
    const result = prepend([1, 2, 3])(numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number[]>>();
    expect(result).toEqual(q.Prepend([1, 2, 3], numArr));
  });

  test("reduce", () => {
    const result = reduce((x, y) => add([x, y]), 0 as number, numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Reduce((curr: any, next: any) => q.Add(curr, next), 0, numArr));
  });

  test("reduce curried 1-2", () => {
    const result = reduce((x: Arg<number>, y: Arg<number>) => add([x, y]))(0, numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Reduce((curr: any, next: any) => q.Add(curr, next), 0, numArr));
  });

  test("reduce curried 2-1", () => {
    const result = reduce((x: Arg<number>, y: Arg<number>) => add([x, y]), 0)(numPage);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Reduce((curr: any, next: any) => q.Add(curr, next), 0, numPage));
  });

  test("reduce curried 1-1-1", () => {
    const result = reduce((x: Arg<number>, y: Arg<number>) => add([x, y]))(0)(numArr);
    expectTypeOf(result).toEqualTypeOf<Query<number>>();
    expect(result).toEqual(q.Reduce((curr: any, next: any) => q.Add(curr, next), 0, numArr));
  });

  test("reverse", () => {
    const result = reverse(strArr);
    expectTypeOf(result).toEqualTypeOf<Query<string[]>>();
    expect(result).toEqual(q.Reverse(strArr));
  });

  test("reverse page", () => {
    const result = reverse(strPage);
    expectTypeOf(result).toEqualTypeOf<Query<Page<string>>>();
    expect(result).toEqual(q.Reverse(strPage));
  });
});
