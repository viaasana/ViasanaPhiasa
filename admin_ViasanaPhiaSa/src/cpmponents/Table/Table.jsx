import "./Table.css"

const Table = ({columns, data})=>{

    return (
        <table className="table">
                <thead>
                    <tr>
                        <th key={-1}>No.</th>
                        {columns.map((column, index) =>(
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td key={-1}>{rowIndex}</td>
                            {columns.map((col, colIndex) => (
                                (colIndex!=columns.length-1)&&<td key={colIndex}>{row[col]}</td>
                            ))}
                            <td key={columns.length-1}><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
    )
}

export default Table