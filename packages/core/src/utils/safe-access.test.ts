import { expect, it } from 'vitest';
import safeAccess from './safe-access';

it(`safeAccess`, () => {
    expect(`${safeAccess(undefined).d.e.f.g}`).toStrictEqual('undefined');
    expect(safeAccess({ a: { b: { c: 1 } } }).a.b.c).toStrictEqual(1);
});
