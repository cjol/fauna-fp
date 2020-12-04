import annotate from 'fn-annotate';
import {
    Arg,
    Callback,
    Query,
    QueryResult
} from './types';
import { q } from './types.internal';

/**
 * Defines a variable’s value.
 */

export function letVar<I, O>(
    // TODO: consider allowing this to be a tuple (or a record?)
    val: Arg<I>,
    f: Callback<[I], O>): Query<QueryResult<O>> {
    const params = annotate(f);
    if (params.length !== 1)
        throw new Error('Only one var can currently be set in letVar');
    const getVar = q.Var(params[0]) as Query<I>;
    return q.Let({ [params[0]]: val }, f(getVar));
}
