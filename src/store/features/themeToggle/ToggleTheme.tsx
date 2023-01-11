import React from 'react'
import type { RootState } from '../../app/Store'
import { useSelector, useDispatch } from 'react-redux'
import { satellite, streets } from './Toggle'

export function Theme() {
    const count = useSelector((state: RootState) => state.theme.value)
    const dispatch = useDispatch()
    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(streets())}
                >
                    Streets
                </button>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(satellite())}
                >
                    Satellite
                </button>
            </div>
        </div>
    )
}