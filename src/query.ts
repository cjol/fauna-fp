import { Client } from "faunadb";
import { Query } from "./types";

export const query = <T>(client: Client, x: Query<T>) => {
  return client.query<T>(x as any);
};
