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
    // = işareti: (0,1) ve (0,2) aynı olmalı
    { type: 'different', cell1: { row: 0, col: 1 }, cell2: { row: 0, col: 2 } },
    // × işareti: (1,1) ve (2,1) farklı olmalı
    { type: 'different', cell1: { row: 1, col: 1 }, cell2: { row: 1, col: 2 } },
    // = işareti: (3,1) ve (4,1) aynı olmalı
    { type: 'different', cell1: { row: 3, col: 4 }, cell2: { row: 3, col: 5 } },
    // × işareti: (4,2) ve (4,3) farklı olmalı
    { type: 'equal', cell1: { row: 4, col: 3 }, cell2: { row: 4, col: 4 } },
  ],
};

// Alternatif olarak daha basit bir puzzle:
export const easyPuzzle: Puzzle = {
  initialBoard: [
    [null, null, null, null, null, null],
    [null, 'lemon', null, 'blueberry', null, null],
    [null, null, null, null, null, null],
    [null, null, 'blueberry', null, null, null],
    [null, null, null, null, 'lemon', null],
    [null, null, null, null, null, null],
  ],
  constraints: [
    // = işareti: (1,0) ve (2,0) aynı olmalı
    { type: 'equal', cell1: { row: 1, col: 0 }, cell2: { row: 2, col: 0 } },
    // × işareti: (0,2) ve (1,2) farklı olmalı
    { type: 'different', cell1: { row: 0, col: 2 }, cell2: { row: 1, col: 2 } },
  ],
};