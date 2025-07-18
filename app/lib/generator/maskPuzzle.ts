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

    // Tüm yatay ve dikey hücre çiftleri için constraint adayı oluştur
    const possibleConstraints: Constraint[] = []
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const current = solution[r][c]

            if (c < size - 1) {
                const right = solution[r][c + 1]
                const type: ConstraintType = current === right ? '=' : '×'
                possibleConstraints.push({
                    from: [r, c],
                    to: [r, c + 1],
                    type,
                })
            }

            if (r < size - 1) {
                const down = solution[r + 1][c]
                const type: ConstraintType = current === down ? '=' : '×'
                possibleConstraints.push({
                    from: [r, c],
                    to: [r + 1, c],
                    type,
                })
            }
        }
    }

    shuffleArray(possibleConstraints)

    const maxConstraints = Math.floor(possibleConstraints.length * constraintRatio)
    const constraints = possibleConstraints.slice(0, maxConstraints)

    return { puzzle, constraints }
}
