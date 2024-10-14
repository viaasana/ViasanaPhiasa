import "./UserContribute.css"
import Table from "../../Table/Table"

const UserContribute = () =>{
    const columns = ["ID", "Email", "Content", "file", "Edit"]
    const userContributions = [
        {
            No: 1,
            ID: 'U001',
            Email: 'user1@example.com',
            Content: 'This is a sample contribution.',
            File: 'file1.pdf',
            Edit: 'Edit'
        },
        {
            No: 2,
            ID: 'U002',
            Email: 'user2@example.com',
            Content: 'Another example contribution.',
            File: 'file2.pdf',
            Edit: 'Edit'
        },
        {
            No: 3,
            ID: 'U003',
            Email: 'user3@example.com',
            Content: 'Yet another contribution to showcase.',
            File: 'file3.pdf',
            Edit: 'Edit'
        }
    ];
    return(
        <div className="user-contribution">
            <div className="title">User's contributions</div>
            <Table columns={columns} data={userContributions}/>
        </div>
    )
}

export default UserContribute