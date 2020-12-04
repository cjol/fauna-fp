import {
    Arg,


    Query,

    Ref
} from './types';
import { q } from './types.internal';

/**
 * Verifies an identity’s credentials.
 */

export function identify(doc: Arg<Ref<any>>): (password: Arg<string>) => Query<boolean>;
export function identify(doc: Arg<Ref<any>>, password: Arg<string>): Query<boolean>;
export function identify(doc: Arg<Ref<any>>, password?: Arg<string>) {
    if (password !== undefined)
        return q.Identify(doc, password);
    return (password: Arg<string>) => identify(doc, password);
}
