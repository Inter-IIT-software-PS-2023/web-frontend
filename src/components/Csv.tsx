import React from 'react'

const Csv = () => {
    return (
        <div>
            <input type="file" onChange={(e) => {
                // e.preventDefault()
                let file = e.target.files[0];

                let formData = new FormData()
                formData.append('file', file)
                console.log(formData)
                //     fetch('http://localhost:3000/upload_files', {
                //         method: 'POST',
                //         body: formData
                //     })
                //         .then(resp => resp.json())
                //         .then(data => {
                //             if (data.errors) {
                //                 alert(data.errors)
                //             }
                //             else {
                //                 console.log(data)
                //             }
                //         })
                //
            }
            }
            />
            <button >
                Submit
            </button>
        </div>
    )
}

export default Csv