// lib/puzzles.ts
import { Fruit } from './constants';

export interface Puzzle {
  initialBoard: Fruit[][];
}

export const samplePuzzle: Puzzle = {
  initialBoard: [
    ['blueberry', null, null, null, null, 'lemon'],
    [null, null, 'lemon', null, null, null],
    [null, 'blueberry', null, null, 'lemon', null],
    [null, null, null, 'blueberry', null, null],
    ['lemon', null, 'blueberry', null, null, null],
    [null, null, null, 'lemon', null, null],
  ],
};