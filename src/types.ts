import { A } from 'ts-toolbelt';
import { Type } from './types.internal';

// the most important datatype is a `Query` type which will represent the result of running an FQL query
export interface Query<T = unknown> extends Type<'Query', { type: T }> { }

// it's useful to have a way to discharge Query types to retrieve their Result type
export type QueryResult<T> = T extends Query<infer U>
  ? QueryResult<U>
  : T extends [...any[]] | Record<string, any>
  ? {
    [Index in keyof T]: QueryResult<T[Index]>;
  }
  : T extends Array<infer U>
  ? Array<QueryResult<U>>
  : T;

// most functions accept either a Query or an object literal, so it's convenient to have a way to represent that
export type QueryOrLiteral<T = unknown> = Query<T> | T;

export type Arg<T = unknown> = [T] extends [never]
  ? Query<never>
  : T extends Query<infer U> // handle nested queries
  ? //   TODO: this isn't very elegant, but effectively I'm trying to block descent into our opaque types. Without this I had problem with `Refs` not resolving properly
  Arg<U>
  : T extends Ref<any> | Function
  ? QueryOrLiteral<T>
  : // handle arrays
  T extends Array<infer U>
  ? QueryOrLiteral<Array<Arg<U>>>
  : // handle objects and tuples
  T extends [...any[]] | Record<string, any>
  ? QueryOrLiteral<
    {
      [Index in keyof T]: Arg<T[Index]>;
    }
  >
  : // handle booleans (else we end up with Query<false> | Query<true> for some reason which causes problems)
  // TODO: I'm not very happy with this because we lose precision on e.g. Arg<true>
  T extends boolean
  ? boolean | Query<boolean>
  : // handle others (mostly primitives)
  QueryOrLiteral<T>;

// Like an Arg, but spreadable (for functions that I think should take an array but FQL doesn't)
export type ArgTuple<Tuple extends [...any[]]> = {
  [Index in keyof Tuple]: Arg<Tuple[Index]>;
};

// map the remaining internal datatypes
export interface Collection<T = unknown, D = unknown>
  extends Type<
  'Collection',
  {
    type: T;
    data: D;
  }
  > { }

export interface Database<T = unknown> extends Type<'Database', { data: T }> { }

export interface Index<O extends Arg[] = [], T = unknown>
  extends Type<
  'Index',
  {
    result: T;
    params: O;
  }
  > { }

export interface Role extends Type<'Role'> { }

export interface Key<D = unknown>
  extends Type<
  'Key',
  {
    data: D;
  }
  > { }

export interface Token<D = unknown> extends Type<'Token', { data: D }> { }
export interface Cursor extends Type<'Cursor'> { }
export interface Timestamp extends Type<'Timestamp'> { }
export interface Date extends Type<'Date'> { }
export interface Ref<T = unknown> extends Type<'Ref', { type: T }> {
  id: string;
}
export interface FaunaFunction<I extends Arg[], O, D = unknown>
  extends Type<'Function', { data: D; terms: I; result: O }> { }

export type Schema<T = unknown> = Ref<Collection<T>> | Ref<Index<any, T>>;

// finally, some useful data structures

export type Credentials<I = unknown, D = unknown> = {
  ref: Ref<Credentials>;
  ts: number;
  hashed_password: string;
  instance: Ref<I>;
  data: D;
};

export interface Page<T> {
  data: T[];
  after?: Cursor;
  before?: Cursor;
}

export type Iter<T> = Page<T> | Array<T>;

export type MapIterable<C extends Iter<any>, O> = C extends Page<any> ? Page<O> : Array<O>;
export type IterPayload<C extends Iter<any>> = C extends Iter<infer O> ? O : never

export type Callback<T extends any[], R> = (
  ...x: { [K in keyof T]: Query<T[K]> }
) => Arg<R>;

export type Document<T> = {
  ref: Ref<T>;
  data: T;
};

export interface SourceObject<O> {
  collection: Ref<Collection<O>> | '_';
  fields: Record<string, (document: Document<O>) => Query<unknown>>;
}

export interface Privilege {
  resource: Ref;
  actions: {
    create?: boolean | ((x: unknown) => boolean);
    delete?: boolean | ((x: Ref) => boolean);
    read?: boolean | ((x: Ref | unknown[]) => boolean);
    write?: boolean | ((oldDoc: unknown, newDoc: unknown, ref: Ref) => boolean);
    history_read?: boolean | ((x: Ref) => boolean);
    history_write?:
    | boolean
    | ((ref: Ref, ts: Timestamp, action: string, newDoc: unknown) => boolean);
    unrestricted_read?: boolean | ((terms: unknown[]) => boolean);
    call?: boolean | ((args: unknown[]) => boolean);
  };
}

export interface Membership {
  resource: Ref;
  predicate?: (ref: Ref) => boolean;
}

export type Action = 'create' | 'delete' | 'update';
