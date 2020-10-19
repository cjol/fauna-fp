import { Equal, expectTypeOf } from 'expect-type';
import { Query, Result } from './types';

describe('types', () => {
  test('Result', () => {
    const t1: Equal<boolean, Result<boolean>> = true;
    const t2: Equal<string, Result<string>> = true;
    const t3: Equal<number, Result<number>> = true;
    const t4: Equal<string[], Result<string[]>> = true;
    const t5: Equal<{ foo: string[] }, Result<{ foo: Query<string>[] }>> = true;
    const t6: Equal<never, Result<() => string>> = true;
  });
});
