import "./UserTap.css"
import Table from "../../Table/Table";

const UserTap = () => {
    const columns = ['Name', 'Email', 'ID', 'Progress', "Edit"];

    const data = [
        { Name: 'John Doe', Email: 'john.doe@example.com', ID: "001",Progress: 100 },
        { Name: 'Jane Smith',Email: 'jane.smith@example.com' , ID: "001",Progress: 100},
        { Name: 'Alice Johnson', Email: 'alice.johnson@example.com' , ID: "001",Progress: 100},
    ];
    return (
        <div className="user-container">
            <div className="title">Users</div>
            <Table columns={columns} data={data} />
        </div>
    )
}

export default UserTap