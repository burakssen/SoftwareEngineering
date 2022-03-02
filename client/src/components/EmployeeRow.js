import {useNavigate, Link} from 'react-router-dom';
import { deleteEmployeeById } from "../endpoint/gateway";

function EmployeeRow(attributes){
    let navigate = useNavigate();

    let handleUpdate = () => {
        navigate("/edit-employee/" + attributes.id, { state: attributes.id});
    }
    let handleDelete = async (id) => {
        await deleteEmployeeById(id);
        window.location.reload();
    }
    return (
            <tr>
                <td>{attributes.name} {attributes.surname}</td>
                <td>{attributes.position}</td>
                <td>{attributes.email}</td>
                <td>
                {attributes.isAdmin ? (
                    <div className="col">
                        <button type="button" className="btn btn-outline-success" onClick={handleUpdate}>Update</button>
                        <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(attributes.id)}>Delete</button>
                    </div>
                    ) : (
                    <Link to={"/employee-performance/" + attributes.id} state={ {isManager: true, employeeId: attributes.id} }><button type="button" className="btn btn-outline-secondary" >View</button></Link>
                )}
                </td>
                <td></td>
            </tr>      
    )
}


export default EmployeeRow;