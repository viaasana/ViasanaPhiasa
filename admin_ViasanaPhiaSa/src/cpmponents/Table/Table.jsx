import "./Table.css"
import Loading from "../Loading/Loading"
import { useContext, useState } from "react"
import { CourseContext } from "../../context/courseContext"

const ConfirmationModal = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Are you sure you want to delete this user?</h2>
                <button onClick={onConfirm}>Yes, Delete</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

const Table = ({ columns, data, onDelete }) => {

    const { deleteUser } = useContext(CourseContext)
    const [loading, setLoading] = useState(false)

    const dele = async (userId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (!isConfirmed) return;
        setLoading(true);
        try {
            const res = await deleteUser(userId);
            await onDelete()
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            setLoading(false);
        }
    };
    if (loading)
        return <Loading />
    return (
        <table className="table">
            <thead>
                <tr>
                    <th key={-1}>#</th>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td key={-1}>{rowIndex}</td>
                        {columns.map((col, colIndex) => (
                            (colIndex != columns.length - 1) && <td key={colIndex}>{row[col]}</td>
                        ))}
                        <td key={columns.length - 1}><button className="btn-delete" onClick={() => dele(row.ID)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table