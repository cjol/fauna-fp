import { query } from 'faunadb';

// treat q as untyped because the builtin types aren't very helpful
export const q = query as Record<keyof typeof query, any>;

export type Collection<T = unknown> = { __TYPE__: 'FAUNA_COLLECTION'; type: T };
export type Database = { __TYPE__: 'FAUNA_DATABASE' };

export type Index<T = unknown, O extends Arg[] = []> = {
  __TYPE__: 'FAUNA_INDEX';
  result: T;
  params: O;
};

export type Role = { __TYPE__: 'FAUNA_ROLE' };

export type Key<D = unknown> = {
  __TYPE__: 'FAUNA_KEY';
  data: D;
};
export type Schema<T = unknown> = Collection<T> | Index<T>;
export type Credentials<I = unknown, D = unknown> = {
  ref: Ref<Credentials>;
  ts: number;
  hashed_password: string;
  instance: Ref<I>;
  data: D;
};
export type Token<D = unknown> = { __TYPE__: 'FAUNA_TOKEN'; data: D };

export type Cursor = { __TYPE__: 'FAUNA_CURSOR' };
export type Timestamp = { __TYPE__: 'FAUNA_TIMESTAMP' };
export const time = (x: Arg<string>) => q.Time(x) as Query<Timestamp>;
export type Date = { __TYPE__: 'FAUNA_DATE' };

export type Ref<T = unknown> = { __TYPE__: 'FAUNA_REF'; type: T };
export type FaunaFunction<I extends Arg[], O> = {
  __TYPE__: 'FAUNA_FUNCTION';
  terms: I;
  result: O;
};

export interface Query<T = unknown> {
  __TYPE__: 'FAUNA_QUERY';
  type: T;
}

export type Arg<T = unknown> = Query<T> | T;
export type ArgTuple<Tuple extends [...any[]]> = {
  [Index in keyof Tuple]: Arg<Tuple[Index]>;
};

export interface Page<T> {
  data: T[];
  after?: Cursor;
  before?: Cursor;
}

export type Result<T> = T extends Query<infer U>
  ? U // TODO: I would like this to be `Result<U>` but TS doesn't like that
  : T extends Array<infer U>
  ? Array<Result<U>>
  : T extends Function
  ? never
  : T extends Record<string, any>
  ? { [K in keyof T]: Result<T[K]> }
  : T extends object
  ? never
  : T;

export type Callback<T extends any[], R> = (
  ...x: { [K in keyof T]: Arg<T[K]> }
) => Arg<R>;
