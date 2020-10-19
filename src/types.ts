import { query } from 'faunadb';

// treat q as untyped because the builtin types aren't very helpful
export const q = query as Record<keyof typeof query, any>;

export type Collection<T = unknown> = { __TYPE__: 'FAUNA_COLLECTION'; type: T };

export type Index<T = unknown, O extends Arg[] = []> = {
  __TYPE__: 'FAUNA_INDEX';
  result: T;
  params: O;
};

export type Schema<T = unknown> = Collection<T> | Index<T>;

export type Cursor = { __TYPE__: 'FAUNA_CURSOR' };

export type Ref<T = unknown> = { __TYPE__: 'FAUNA_REF'; type: T };

export interface Query<T = unknown> {
  __TYPE__: 'FAUNA';
  type: T;
}

export type Arg<T = unknown> = Query<T> | T;

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
