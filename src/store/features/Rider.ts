import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/Store'
import { Rider } from '../../makeData/geo'
export interface Rider {
	id: number
	name: string
	position: {
		lat: number
		lng: number
	}
	package: Array<{
		product_id: string
		address: string
		location: string
		lng: number
		lat: number
		customer_name: string
		customer_phone: number
	}>
}

interface RiderState {
	rider: Array<Rider>
	currentRider: Array<Rider>
}
const initialState: RiderState = {
	rider: Rider,
	currentRider: [],
}

export const riderSlice = createSlice({
	name: 'rider',
	initialState,
	reducers: {
		setCurrentRider: (state, action) => {
			state.currentRider = action.payload
		},
	},
})

export const { setCurrentRider } = riderSlice.actions
export const riderSelector = (state: RootState) => state.rider
export default riderSlice.reducer
