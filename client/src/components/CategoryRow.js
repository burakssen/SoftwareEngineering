import {useNavigate} from 'react-router-dom';
import {deleteCategoryById} from "../endpoint/gateway";

function CategoryRow(attributes){
    let navigate = useNavigate();

    let handleUpdate = () => {
        navigate("/edit-category/" + attributes.id, { state: attributes.id});
    }
    let handleDelete = (id) => {
        deleteCategoryById(id);
        window.location.reload();
    }
    return (
        <tr>
            <td>{attributes.name}</td>
            <td>
                <div className="col">
                    <button type="button" className="btn btn-outline-success" onClick={handleUpdate}>Update</button>
                    <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(attributes.id)}>Delete</button>
                </div>
            </td>
        </tr>
    )
}


export default CategoryRow;