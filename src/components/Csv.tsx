import * as XLSX from 'xlsx'
import "../styles/Csv.css"
const Csv = () => {

    const readExcel = async (e: any) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        return new Promise((resolve, reject) => {
            resolve(jsonData)
        })
    }

    return (
        <div>
            <input type="file" onChange={(e) => {

                e.preventDefault()
                readExcel(e)
                    .then((data: any) => {
                        fetch('http://localhost:8000/orders/new', {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        })
                            .then(resp => resp.json())
                            .then(data => {
                                console.log(data)
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            }
            }

                className="csv-input"
            />
            <button className='csv-btn'>
                Submit
            </button>
        </div>
    )
}

export default Csv