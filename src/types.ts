/* eslint-disable @typescript-eslint/ban-types */
import { Type } from "./types.internal";

// the most important datatype is a `Query` type which will represent the result of running an FQL query
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Query<T = unknown> extends Type<"Query", { type: T }> {}

// it's useful to have a way to discharge Query types to retrieve their Result type
export type QueryResult<T> = T extends Query<infer U>
  ? QueryResult<U>
  : T extends [...unknown[]] | Record<string, unknown>
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
  : T extends Ref<unknown> | Function
  ? QueryOrLiteral<T>
  : // handle arrays
  T extends Array<infer U>
  ? QueryOrLiteral<Array<Arg<U>>>
  : // handle objects and tuples
  T extends [...unknown[]] | Record<string, unknown>
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
export type ArgTuple<Tuple extends [...unknown[]]> = {
  [Index in keyof Tuple]: Arg<Tuple[Index]>;
};

// map the remaining internal datatypes
export interface Collection<T = unknown, D = unknown>
  extends Type<
    "Collection",
    {
      type: T;
    }
  > {
  ref: Ref<Collection<T, D>>;
  ts: number;
  name: string;
  data?: D;
  history_days?: number;
  ttl_days?: number;
}

export interface Database<D = unknown> extends Type<"Database"> {
  ref: Ref<Database<D>>;
  global_id: string;
  ts: number;
  name: string;
  data?: D;
}

export interface Index<I extends Arg[] = [], O = unknown, D = unknown>
  extends Type<
    "Index",
    {
      result: O;
      params: I;
    }
  > {
  ref: Ref<Index<I, O>>;
  ts: number;
  name: string;
  source: SourceObject<O>;
  active: boolean;
  terms?: Array<{ binding: string } | { field: string[] }>;
  values?: Array<{ reverse?: boolean } & ({ binding: string } | { field: string[] })>;
  unique?: boolean;
  serialized?: boolean;
  data?: D;
}

export interface Role<D = unknown> extends Type<"Role"> {
  ref: Ref<Role<D>>;
  ts: number;
  data?: D;
  name: string;
  privileges?: Array<Privilege>;
  membership?: Array<Membership>;
}

export interface Key<D = unknown, RD = unknown> extends Type<"Key"> {
  ref: Ref<Key<D>>;
  ts: number;
  role: string | Ref<Role<RD>>;
  hashed_secret: string;
  data?: D;
  database?: Ref<Database>;
  name?: string;
}

export interface Token<D = unknown> extends Type<"Token"> {
  ref: Ref<Token<D>>;
  ts: number;
  instance: Ref;
  hashed_secret: string;
}
export type Cursor = Type<"Cursor">;
export type Timestamp = Type<"Timestamp">;
export type Date = Type<"Date">;
export type DocRef<T> = Ref<Document<T>>;
export interface Ref<T = unknown> extends Type<"Ref", { type: T }> {
  id: string;
}
export interface FaunaFunction<I extends Arg[], O, D = unknown>
  extends Type<"Function", { terms: I; result: O }> {
  ref: Ref<FaunaFunction<I, O, D>>;
  ts: number;
  name: string;
  role?: string | Role;
  data?: D;
  // TODO: I don't yet have a runtime representation of Query objects
  body: unknown;
}

// TODO: create a real "schema" type, and set Collection = Schema<Document>
// type Schema<T = unknown> = Ref<Collection<T>> | Ref<Index<unknown[], T>>;

// finally, some useful data structures

export type Credentials<I = unknown, D = unknown> = {
  ref: Ref<Credentials>;
  ts: number;
  hashed_password: string;
  instance: Ref<I>;
  data?: D;
};

export interface Page<T> {
  data: T[];
  after?: Cursor;
  before?: Cursor;
}

export type Iter<T = unknown> = Page<T> | Array<T>;

export type MapIterable<C extends Iter<unknown>, O> = C extends Page<unknown> ? Page<O> : Array<O>;
export type IterPayload<C extends Iter> = C extends Iter<infer O> ? O : never;

export type Callback<T extends unknown[], R> = (...x: { [K in keyof T]: Query<T[K]> }) => Arg<R>;

export type Document<T> = {
  ref: Ref<T>;
  ts: number;
  data: T;
};

export interface SourceObject<O> {
  collection: Ref<Collection<O>> | "_";
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

export type Action = keyof Privilege["actions"];
