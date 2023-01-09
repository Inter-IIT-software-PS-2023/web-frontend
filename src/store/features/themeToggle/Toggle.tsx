import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    value: string
}

const initialState: CounterState = {
    value: "mapbox://styles/mapbox/streets-v12",
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        satellite: (state) => {
            state.value = "mapbox://styles/mapbox/satellite-v9"
        },
        streets: (state) => {
            state.value = "mapbox://styles/mapbox/streets-v12"
        },
    },
})

export const { satellite, streets } = counterSlice.actions

export default counterSlice.reducer