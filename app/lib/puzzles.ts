// lib/puzzles.ts
import { Fruit } from './constants';

export interface Constraint {
  type: 'equal' | 'different';
  cell1: { row: number; col: number };
  cell2: { row: number; col: number };
}

export interface Puzzle {
  initialBoard: Fruit[][];
  constraints: Constraint[];
}

export const samplePuzzle: Puzzle = {
  initialBoard: [
    [null, null, null, null, null, null],
    ['lemon', 'lemon', null, null, 'lemon', null],
    ['lemon', null, null, 'blueberry', null, 'blueberry'],
    [null, null, 'blueberry', null, null, null],
    ['blueberry', null, null, null, 'blueberry', null],
    [null, null, null, 'lemon', 'lemon', null],
  ],
  constraints: [
    { type: 'different', cell1: { row: 0, col: 1 }, cell2: { row: 0, col: 2 } },
    { type: 'different', cell1: { row: 1, col: 1 }, cell2: { row: 1, col: 2 } },
    { type: 'different', cell1: { row: 3, col: 4 }, cell2: { row: 3, col: 5 } },
    { type: 'equal', cell1: { row: 4, col: 3 }, cell2: { row: 4, col: 4 } },
  ],
};
