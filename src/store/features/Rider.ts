import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/Store'
export interface Rider {
	id: string
	riderId: string
	endTime: number
	position: {
		lat: number
		lng: number
	}
	order: Array<{
		id: string
		productId: string
		name: string
		status: string
		awb: string
		reachTime: number
		clusterId: string
		address: {
			id: string
			address: string
			location: string
			lat: number
			lng: number
			orderId: string
		}
	}>
	rider: {
		id: string
		username: string
		password: string
	}
}

interface RiderState {
	rider: Array<Rider>
	currentRider: Array<Rider>
}
const initialState: RiderState = {
	rider: [],
	currentRider: [],
}

export const riderSlice = createSlice({
	name: 'rider',
	initialState,
	reducers: {
		setCurrentRider: (state, action) => {
			state.currentRider = action.payload
		},
		setRider: (state, action) => {
			state.rider = action.payload
		},
	},
})

export const { setCurrentRider, setRider } = riderSlice.actions
export const riderSelector = (state: RootState) => state.rider
export default riderSlice.reducer
