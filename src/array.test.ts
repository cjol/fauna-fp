import { query as q } from 'faunadb';
import { pipe } from 'fp-ts/function';
import { all, any, append } from './array';

describe('array', () => {
  test('all', () => {
    expect(all([true, true, false])).toEqual(q.All([true, true, false]));
  });

  test('any', () => {
    expect(any([true, true, false])).toEqual(q.Any([true, true, false]));
  });

  test('append', () => {
    expect(pipe([4, 5, 6], append([1, 2, 3]))).toEqual(
      q.Append([1, 2, 3], [4, 5, 6])
    );
  });
});
