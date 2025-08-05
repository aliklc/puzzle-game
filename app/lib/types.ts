import { DifficultyLevel } from "./difficultyConfig"

export type Fruit = '🫐' | '🍋'
export type Cell = Fruit | null

export type ConstraintType = '=' | '×'

export interface Constraint {
    from: [number, number]
    to: [number, number]
    type: ConstraintType
}

// --- Yeni Backend Game Tipleri ---
export interface GameCreate {
  name: string;
  type: string;
  description?: string;
  data: {
    puzzle_data: Cell[][];
    constraints: Constraint[];
    solution_data: Cell[][];
    gridSize: number;
    difficulty: DifficultyLevel;
    [key: string]: unknown;
  };
  game_hash: string;
}

export interface GameResponse extends GameCreate {
  id: number;
  created_at?: string;
}

export interface GameInstanceCreate {
  game_id: number;
  user_data?: Record<string, unknown>;
}

export interface GameInstanceUpdate {
  user_data: Record<string, unknown>;
  time_spent: number;
}

export interface GameInstanceFinish {
  user_solution: Record<string, unknown>; // Kullanıcının gönderdiği çözüm
  time_spent: number;
}

export interface GameInstanceResponse {
  id: number;
  user_id: number;
  game_id: number;
  user_data?: Record<string, unknown>;
  status?: string;
  score: number;
  time_spent: number;
  started_at?: string;
  completed_at?: string;
}

// SaveButton için yeni prop tipi
export interface SaveButtonProps {
  puzzle: Cell[][];
  constraints: Constraint[];
  solution: Cell[][];
  gridSize: number;
  difficulty: DifficultyLevel;
  onSuccess?: () => void;
  onSave?: (gameId: number) => void;
}