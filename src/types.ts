import { query } from 'faunadb';

// treat q as untyped because the builtin types aren't very helpful
export const q = query as Record<keyof typeof query, any>;

export type Collection<T = unknown, D = unknown> = {
  __TYPE__: { name: 'FAUNA_COLLECTION'; type: T; data: D };
};
export type Database<T = unknown> = { __TYPE__: 'FAUNA_DATABASE'; data: T };

export type Index<T = unknown, O extends Arg[] = []> = {
  __TYPE__: { name: 'FAUNA_INDEX'; result: T; params: O };
};

export type Role = { __TYPE__: { name: 'FAUNA_ROLE' } };

export type Key<D = unknown> = {
  __TYPE__: { name: 'FAUNA_KEY'; data: D };
};
export type Schema<T = unknown> = Ref<Collection<T>> | Ref<Index<T>>;
export type Credentials<I = unknown, D = unknown> = {
  ref: Ref<Credentials>;
  ts: number;
  hashed_password: string;
  instance: Ref<I>;
  data: D;
};
export type Token<D = unknown> = { __TYPE__: { name: 'FAUNA_TOKEN'; data: D } };

export type Cursor = { __TYPE__: { name: 'FAUNA_CURSOR' } };
export type Timestamp = { __TYPE__: { name: 'FAUNA_TIMESTAMP' } };
export const time = (x: Arg<string>) => q.Time(x) as Query<Timestamp>;
export type Date = { __TYPE__: { name: 'FAUNA_DATE' } };

export type Ref<T = unknown> = {
  id: string;
  __TYPE__: { name: 'FAUNA_REF'; type: T };
};
export type FaunaFunction<I extends Arg[], O, D = unknown> = {
  __TYPE__: { name: 'FAUNA_FUNCTION'; data: D; terms: I; result: O };
};

export interface Query<T = unknown> {
  __TYPE__: { name: 'FAUNA_QUERY'; type: T };
}

type QueryOrLiteral<T> = T | Query<T>;

export type Arg<T = unknown> = [T] extends [never]
  ? Query<never>
  : T extends boolean
  ? boolean | Query<boolean>
  : T extends Query<infer U>
  ? Arg<U>
  : T extends [...any[]]
  ? QueryOrLiteral<
      {
        [Index in keyof T]: Arg<T[Index]>;
      }
    >
  : T extends Array<infer U>
  ? QueryOrLiteral<Array<Arg<U>>>
  : // TODO: this isn't very elegant, but effectively I'm trying to block descent into our opaque types.
  // We'll probably need to add more - or possibly I can use a single extends to catch 'em all.
  T extends Ref<any> | Function
  ? QueryOrLiteral<T>
  : T extends Record<string, any>
  ? Query<{ [K in keyof T]: T[K] }> | { [K in keyof T]: Arg<T[K]> }
  : QueryOrLiteral<T>;

export type ArgTuple<Tuple extends [...any[]]> = {
  [Index in keyof Tuple]: Arg<Tuple[Index]>;
};
export interface Page<T> {
  data: T[];
  after?: Cursor;
  before?: Cursor;
}

export type Callback<T extends any[], R> = (
  ...x: { [K in keyof T]: Query<T[K]> }
) => Arg<R>;

export type Document<T> = {
  ref: Ref<T>;
  data: T;
};

/**
 * This is a bit of a hack for flattening queries
 * @param x Record containing queries
 */
export function qAll<T extends object>(x: T) {
  return x as Query<{ [K in keyof T]: T[K] extends Query<infer U> ? U : T[K] }>;
}
