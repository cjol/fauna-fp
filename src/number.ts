import { Query, Arg } from './types';
import { q } from './types.internal';

export function add(as: Arg<number[]>): Query<number> {
    return q.Add(as);
}
export function subtract(as: Arg<number[]>): Query<number> {
    return q.Subtract(as);
}
export function multiply(as: Arg<number[]>): Query<number> {
    return q.Multiply(as);
}
export function divide(as: Arg<number[]>): Query<number> {
    return q.Divide(as);
}
