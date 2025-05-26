import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Item = {
    name: string
    price: number,
    linesPerMilliseconds: number,
}

export type GameState = {
    currentScore: number,
    ownedItems: Item[],
}

const initialState = {
    ownedItems: [] as Item[],
    currentScore: 30,
} satisfies GameState as GameState

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        incrementScore(state, action: PayloadAction<number>) {
            state.currentScore += action.payload;
        },
        buyItem(state, action: PayloadAction<Item>) {
            const item = action.payload;
            if (item.price > state.currentScore) return;

            state.currentScore -= item.price;
            state.ownedItems.push(action.payload);
        }
    }
})

export const {incrementScore, buyItem} = gameSlice.actions;
export const reducer = gameSlice.reducer;
export default reducer