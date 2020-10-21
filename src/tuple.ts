// TODO: I would rather not maintain this. Can I re-export from elsewhere?
export const tuple = <T extends any[]>(...args: T): T => args;

export const concatTuple = <T extends any[], U extends any[]>(...arr2: T) => (
  arr1: U
): [...U, ...T] => [...arr1, ...arr2];

export const toTuple = <T extends any[], U>(...arr2: T) => (
  item: U
): [U, ...T] => [item, ...arr2];