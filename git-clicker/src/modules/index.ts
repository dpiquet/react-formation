import {combineReducers} from "@reduxjs/toolkit";
import {reducer as gameReducer } from './game';

export const rootReducer = combineReducers({
    game: gameReducer,
})