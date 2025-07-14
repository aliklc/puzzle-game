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
    ['blueberry', null, null, null, null, 'blueberry'],
    [null, null, null, null, null, null],
    [null, null, null, 'lemon', null, null],
    [null, null, 'lemon', null, null, null],
    ['lemon', null, null, 'blueberry', null, null],
    [null, null, 'lemon', null, 'blueberry', 'blueberry'],
  ],
  constraints: [
    // × işareti: (2,1) ve (2,2) farklı olmalı
    { type: 'different', cell1: { row: 2, col: 1 }, cell2: { row: 2, col: 2 } },
    // = işareti: (3,0) ve (3,1) aynı olmalı
    { type: 'equal', cell1: { row: 3, col: 0 }, cell2: { row: 3, col: 1 } },
    // = işareti: (4,1) ve (5,1) aynı olmalı
    { type: 'equal', cell1: { row: 4, col: 1 }, cell2: { row: 5, col: 1 } },
  ],
};