import { Fruit, Constraint, ConstraintType } from '../types'
import { shuffleArray } from '../utils/shuffle'

export function maskPuzzle(
    solution: Fruit[][],
    blankRatio: number = 0.5,
    constraintRatio: number = 0.3
): {
    puzzle: (Fruit | null)[][],
    constraints: Constraint[]
} {
    const size = solution.length

    // Puzzle kopya
    const puzzle: (Fruit | null)[][] = solution.map(row => [...row])

    // Boşluk bırakma
    const allCells: [number, number][] = []
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            allCells.push([r, c])
        }
    }
    shuffleArray(allCells)

    const maxBlanks = Math.floor(size * size * blankRatio)
    let blanks = 0

    for (const [r, c] of allCells) {
        if (blanks >= maxBlanks) break
        puzzle[r][c] = null
        blanks++
    }

    // Sadece en az bir tarafı boş olan constraint'leri oluştur
    const meaningfulConstraints: Constraint[] = []
    
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            // Sağ komşu kontrolü
            if (c < size - 1) {
                const leftIsEmpty = puzzle[r][c] === null
                const rightIsEmpty = puzzle[r][c + 1] === null
                
                // En az bir tarafı boş ise constraint ekle
                if (leftIsEmpty || rightIsEmpty) {
                    const current = solution[r][c]
                    const right = solution[r][c + 1]
                    const type: ConstraintType = current === right ? '=' : '×'
                    meaningfulConstraints.push({
                        from: [r, c],
                        to: [r, c + 1],
                        type,
                    })
                }
            }

            // Alt komşu kontrolü
            if (r < size - 1) {
                const topIsEmpty = puzzle[r][c] === null
                const bottomIsEmpty = puzzle[r + 1][c] === null
                
                // En az bir tarafı boş ise constraint ekle
                if (topIsEmpty || bottomIsEmpty) {
                    const current = solution[r][c]
                    const down = solution[r + 1][c]
                    const type: ConstraintType = current === down ? '=' : '×'
                    meaningfulConstraints.push({
                        from: [r, c],
                        to: [r + 1, c],
                        type,
                    })
                }
            }
        }
    }

    // Constraint'leri karıştır ve belirli bir oranını seç
    shuffleArray(meaningfulConstraints)
    const maxConstraints = Math.floor(meaningfulConstraints.length * constraintRatio)
    const constraints = meaningfulConstraints.slice(0, maxConstraints)

    return { puzzle, constraints }
}