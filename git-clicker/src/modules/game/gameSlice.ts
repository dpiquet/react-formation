import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

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

export const loadState = createAsyncThunk<void>(
    'game/load',
    async (_, {dispatch}) => {
        // retrieve data from localStorage
        const localStoredState = localStorage.getItem('gamestate')

        const loadedState = localStoredState
            ? JSON.parse(localStoredState)
            : initialState

        // dispatch the initialize action to mutate state
        dispatch(gameSlice.actions.initialize(loadedState))
    },
)

export const saveState = createAsyncThunk<void>(
    'game/save',
    async (_, {getState}) => {
        localStorage.setItem('gamestate', JSON.stringify(getState().game))
    },
)

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        initialize(_, action: PayloadAction<GameState>) {
            return action.payload;
        },
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