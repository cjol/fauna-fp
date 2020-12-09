import { Client } from "faunadb";
import * as fns from "../fns";
import { Query } from "../types";

export function query(client: Client) {
  return <T>(x: Query<T>) => fns.query(client, x);
}
