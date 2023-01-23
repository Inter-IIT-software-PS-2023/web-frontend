import { useDispatch } from 'react-redux'
import { themChanger } from './Toggle'
import { FaMap, FaSatellite } from 'react-icons/fa'
export function Theme() {
	const dispatch = useDispatch()
	return (
		<>
			<div className={'st-sat'}>
				<button
					aria-label='Increment value'
					className='toggle-button'
					onClick={() => dispatch(themChanger())}
				>
					<FaMap />
					Streets
				</button>
				<button
					aria-label='Decrement value'
					className='toggle-button'
					onClick={() => dispatch(themChanger())}
				>
					<FaSatellite />
					Satellite
				</button>
			</div>
		</>
	)
}
