import { query } from 'faunadb';

// treat q as untyped because the builtin types aren't very helpful
export const q = query as Record<keyof typeof query, any>;

export type Collection<T = unknown> = { __TYPE__: 'FAUNA_COLLECTION' };

export type Index<T = unknown, O extends Arg[] = []> = {
  __TYPE__: 'FAUNA_INDEX';
};

export type Schema<T = unknown> = Collection<T> | Index<T>;

export type Cursor = { __TYPE__: 'FAUNA_CURSOR' };

export type Ref<T = unknown> = { __TYPE__: 'FAUNA_REF' };

export type Query<T = unknown> = { __TYPE__: 'FAUNA' };

export type Arg<T = unknown> = Query<T> | T;

export interface Page<T> {
  data: T[];
  after?: Cursor;
  before?: Cursor;
}
