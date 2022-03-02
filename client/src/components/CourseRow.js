import { useNavigate } from 'react-router-dom';
import { deleteCourseById } from "../endpoint/gateway";
import Notification from "./Notification";

function CourseRow(attributes){
    let navigate = useNavigate();

    let handleUpdate = () => {
        navigate("/edit-course/" + attributes.id, { state: attributes.id});
    }
    let handleDelete = async (id) => {
        let response = await deleteCourseById(id);
        if(response.status === 200){
            Notification("You deleted a course successfully", "success", 2000);
        }
        else{
            Notification("Something went wrong please try again later", "error", 2000);
        }
        window.location.reload();
    }
    return (
        <tr>
            <td>{attributes.name}</td>
            <td>{attributes.category.name}</td>
            <td>{attributes.duration}</td>
            <td>{attributes.isLive ? "Live" : "Not live"}</td>
            <td>
                <div className="col">
                    <button type="button" className="btn btn-outline-success m-1" onClick={handleUpdate}>Update</button>
                    <button type="button" className="btn btn-outline-danger m-1" onClick={() => handleDelete(attributes.id)}>Delete</button>
                </div>
            </td>
        </tr>
    )
}


export default CourseRow;