import { Client } from 'faunadb';
import { Query, QueryResult } from './types';

export const query = <T>(client: Client, x: Query<T>) => {
  return client.query<QueryResult<T>>(x as any);
};
