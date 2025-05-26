import {combineReducers} from "@reduxjs/toolkit";
import {reducer as gameReducer } from './game/gameSlice.ts';

export const rootReducer = combineReducers({
    game: gameReducer,
})