import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/Store'

export interface CounterState {
	value: string
}

const initialState: CounterState = {
	value: 'mapbox://styles/mapbox/streets-v12',
}

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		themChanger: state => {
			if (state.value === 'mapbox://styles/mapbox/satellite-v9') {
				state.value = 'mapbox://styles/mapbox/streets-v12'
				return
			}

			state.value = 'mapbox://styles/mapbox/satellite-v9'
		},
	},
})

export const { themChanger } = counterSlice.actions
export const themeSelector = (state: RootState) => state.theme.value
export default counterSlice.reducer
