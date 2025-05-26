import game, {buyItem, incrementScore, Item} from './gameSlice.ts'

describe('game reducer', () => {
    it('should handle incrementScore', () => {
        const initialState = {
            ownedItems: [] as Item[],
            currentScore: 30,
        }

        const incrementAction = incrementScore(1)
        const actual = game(initialState, incrementAction)
        const expected = {
            ownedItems: [] as Item[],
            currentScore: 31,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle buyItem', () => {
        const initialState = {
            ownedItems: [] as Item[],
            currentScore: 30,
        }

        const item = {
            name: 'test',
            price: 10,
            linesPerMilliseconds: 1000,
        }

        const buyItemAction = buyItem(item)

        const actual = game(initialState, buyItemAction)
        const expected = {
            ownedItems: [item],
            currentScore: 20,
        }

        expect(actual).toEqual(expected)
    })
})