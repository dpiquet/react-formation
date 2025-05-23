import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from './modules'


function createStore() {
    return configureStore({
        reducer: rootReducer,
    })
}

const store = createStore()

export type RootState = ReturnType<typeof store.getState>

export default store;