import {
    Arg,
    Query
} from './types';
import { q } from './types.internal';

// TODO: move below into separate files

export function abort(x: Arg<string>): Query<never> {
    return q.Abort(x);
}
