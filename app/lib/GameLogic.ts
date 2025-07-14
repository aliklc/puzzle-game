import { Fruit } from './constants';
import { Constraint } from './puzzles';

    export const isInvalidCell = (board: Fruit[][], row: number, col: number,constraints: Constraint[]): boolean => {
        const fruit = board[row][col];
        if (!fruit) return false;

        // Ardışık 3 veya daha fazla aynı meyve kontrolü
        const countInDirection = (dr: number, dc: number) => {
            let r = row + dr;
            let c = col + dc;
            let count = 0;
            while (
                r >= 0 && r < 6 &&
                c >= 0 && c < 6 &&
                board[r][c] === fruit
            ) {
                count++;
                r += dr;
                c += dc;
            }
            return count;
        }

        const horizontalCount = 1 + countInDirection(0, -1) + countInDirection(0, 1);
        const verticalCount = 1 + countInDirection(-1, 0) + countInDirection(1, 0);

        if (horizontalCount > 2 || verticalCount > 2) return true;
    
        // Satır/sütun maksimum sayı kontrolü
        const rowCount = board[row].filter(f => f === fruit).length;
        const colCount = board.map(r => r[col]).filter(f => f === fruit).length;

        const maxPerType = board.length / 2;
        if (rowCount > maxPerType || colCount > maxPerType) return true;

        // Constraint ihlali kontrolü
        for (const constraint of constraints) {
            const { type, cell1, cell2 } = constraint;
            
            if ((cell1.row === row && cell1.col === col) || (cell2.row === row && cell2.col === col)) {
                const fruit1 = board[cell1.row][cell1.col];
                const fruit2 = board[cell2.row][cell2.col];
                
                if (fruit1 && fruit2) {
                    if (type === 'equal' && fruit1 !== fruit2) return true;
                    if (type === 'different' && fruit1 === fruit2) return true;
                }
            }
        }

        return false;
    }

    export const checkPuzzleComplete = (board: Fruit[][],constraints: Constraint[]): boolean => {
        // 1. Tüm hücreler dolu mu?
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 6; col++) {
                if (board[row][col] === null) {
                    return false;
                }
            }
        }

        // 2. Hiçbir hücre invalid mi?
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 6; col++) {
                if (isInvalidCell(board, row, col,constraints)) {
                    return false;
                }
            }
        }

        // 3. Her satır ve sütunda her meyve türünden eşit sayıda var mı?
        for (let row = 0; row < 6; row++) {
            const lemonCount = board[row].filter(f => f === 'lemon').length;
            const blueberryCount = board[row].filter(f => f === 'blueberry').length;
            if (lemonCount !== 3 || blueberryCount !== 3) {
                return false;
            }
        }

        for (let col = 0; col < 6; col++) {
            const lemonCount = board.map(r => r[col]).filter(f => f === 'lemon').length;
            const blueberryCount = board.map(r => r[col]).filter(f => f === 'blueberry').length;
            if (lemonCount !== 3 || blueberryCount !== 3) {
                return false;
            }
        }

        // 4. Tüm constraint'ler sağlanıyor mu?
        for (const constraint of constraints) {
            const { type, cell1, cell2 } = constraint;
            const fruit1 = board[cell1.row][cell1.col];
            const fruit2 = board[cell2.row][cell2.col];
            
            if (fruit1 && fruit2) {
                if (type === 'equal' && fruit1 !== fruit2) return false;
                if (type === 'different' && fruit1 === fruit2) return false;
            }
        }

        return true;
    }