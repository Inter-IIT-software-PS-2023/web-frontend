import React from 'react'
import '../styles/Csv.css'
const Csv = () => {
	return (
		<div>
			<input
				type='file'
				onChange={e => {
					// e.preventDefault()
					// let file = e.target.files[0]
					// let formData = new FormData()
					// formData.append('file', file)
					// console.log(formData)
					// fetch('http://localhost:8000/route/new', {
					//     method: 'POST',
					//     body: formData,
					//     headers: {
					//         "Content-Type": "multipart/form-data",
					//         "Accept": "application/json",
					//         "type": "formData"
					//     },
					// })
					//     .then(resp => resp.json())
					//     .then(data => {
					//         if (data.errors) {
					//             alert(data.errors)
					//         }
					//         else {
					//             console.log(data)
					//         }
					//     })
				}}
				className='csv-input'
			/>
			<button className='csv-btn'>Submit</button>
		</div>
	)
}

export default Csv
