import { Query, Timestamp } from './types';
import { q } from './types.internal';


export function now(): Query<Timestamp> {
    return q.Now();
}
