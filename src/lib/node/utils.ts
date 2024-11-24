import { Children } from './types';

// 배열 평탄화 함수
export function flattenArray(array: Children[]): Children[] {
  return array.reduce<Children[]>(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val),
    []
  );
}
