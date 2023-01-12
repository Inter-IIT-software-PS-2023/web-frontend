import React from 'react'
import type { RootState } from '../../app/Store'
import { useSelector, useDispatch } from 'react-redux'
import { satellite, streets } from './Toggle'

export function Theme() {
	const count = useSelector((state: RootState) => state.theme.value)
	const dispatch = useDispatch()
	return (
		<>
			<div className={'st-sat'}>
				<button aria-label='Increment value' className='toggle-button' onClick={() => dispatch(streets())}>
					Streets
				</button>
				<button aria-label='Decrement value' className='toggle-button' onClick={() => dispatch(satellite())}>
					Satellite
				</button>
			</div>
		</>
	)
}
