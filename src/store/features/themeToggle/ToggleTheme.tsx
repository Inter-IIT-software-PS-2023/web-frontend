import React from 'react'
import type { RootState } from '../../app/Store'
import { useSelector, useDispatch } from 'react-redux'
import { satellite, streets } from './Toggle'
import { FaMap, FaSatellite } from 'react-icons/fa'
export function Theme() {
	const count = useSelector((state: RootState) => state.theme.value)
	const dispatch = useDispatch()
	return (
		<>
			<div className={'st-sat'}>
				<button
					aria-label='Increment value'
					className='toggle-button'
					onClick={() => dispatch(streets())}
				>
					<FaMap />
					Streets
				</button>
				<button
					aria-label='Decrement value'
					className='toggle-button'
					onClick={() => dispatch(satellite())}
				>
					<FaSatellite />
					Satellite
				</button>
			</div>
		</>
	)
}
