import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";

export type Item = {
    name: string
    price: number,
    linesPerMillisecond: number,
}

export type GameState = {
    currentScore: number,
    ownedItems: Item[],
    availableItems: Item[],
}

const initialState = {
    ownedItems: [] as Item[],
    currentScore: 30,
    availableItems: [] as Item[],
} satisfies GameState as GameState

const selectSelf = (state: RootState) => {
    return state.game
}
export const availableItemsSelector = createSelector(selectSelf, (state) => state.availableItems);

export const loadAvailableItems = createAsyncThunk<void>(
    'game/loadAvailableItems',
    async (_, {dispatch}) => {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await fetch(`${apiUrl}/api/shop/items`)

        const items = await response.json()
        dispatch(gameSlice.actions.setAvailableItem(items));
    },
)

export const loadState = createAsyncThunk<void>(
    'game/load',
    async (_, {dispatch}) => {
        // retrieve data from localStorage
        const localStoredState = localStorage.getItem('gamestate')

        const loadedState = localStoredState
            ? JSON.parse(localStoredState)
            : initialState

        // dispatch the initialize action to mutate state
        // dispatch(gameSlice.actions.initialize(loadedState))
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
        setAvailableItem(state, action: PayloadAction<Item[]>) {
            state.availableItems = action.payload;
        },
        buyItem(state, action: PayloadAction<Item>) {
            const item = action.payload;
            if (item.price > state.currentScore) return;

            state.currentScore -= item.price;
            state.ownedItems.push(action.payload);
        }
    }
})

export const {incrementScore, buyItem, setAvailableItem} = gameSlice.actions;
export const reducer = gameSlice.reducer;
export default reducer