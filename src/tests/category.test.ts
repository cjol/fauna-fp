import * as q from "../fns";
import { Arg, DocRef, Query } from "../types";

interface Category {
  path: string[];
  parent: "null" | DocRef<Category>;
  matchPaths: string[];
}

describe("sample category flow", () => {
  test("works", () => {
    const txnCategoryCollection = q.collection<Category>("categories");
    const txnCategoryByPath = q.index<[string], [DocRef<Category>]>("categories_by_path");
    const addPaths = (
      ref: Query<"null" | DocRef<Category>>,
      newPaths: Arg<string[]>
    ): Query<boolean> =>
      q.iff(
        q.isString(ref),
        true,
        q.letVar(q.get(ref as Arg<DocRef<Category>>), (item) => {
          const joinedMatches = q.union(q.select(item, "data", "matchPaths"), newPaths);
          const parentRef = q.select(item, "data", "parent") as
            | Query<"null">
            | Query<DocRef<Category>>;
          return q.doMany(
            q.update(ref as Arg<DocRef<Category>>, {
              data: {
                matchPaths: joinedMatches,
              },
            }),
            q.call(addPathsUDF, [parentRef, joinedMatches])
          );
        })
      );
    const createAddPaths = q.createFunction({
      body: q.queryLambda(addPaths),
      name: "addPaths",
    });
    const addPathsUDF = q.fun<["null" | DocRef<Category>, string[]], boolean>("addPaths");

    function createCategory(path: Arg<string[]>) {
      const parentPath = q.reverse(q.drop(1, q.reverse(path)));
      const parentPathStr = q.concat(parentPath, "#");
      const parentMatch = q.match(txnCategoryByPath, [parentPathStr]);
      const parentRef = q.iff(q.exists(parentMatch), q.select(q.get(parentMatch), "ref"), "null");
      const matchPaths = [q.concat(path, "#")];
      return q.doMany(
        q.create(txnCategoryCollection, {
          data: {
            path,
            matchPaths,
            parent: parentRef,
          },
        }),
        q.call(addPathsUDF, [parentRef, matchPaths])
      );
    }
  });
});
