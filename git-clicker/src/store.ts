import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from './modules'
import {useDispatch} from "react-redux";

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    })
}

const store = createStore()

export type RootState = ReturnType<typeof store.getState>

export default store;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch