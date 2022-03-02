import {useNavigate} from 'react-router-dom';
import {deleteVideo} from "../endpoint/gateway";

function VideoRow(attributes){
    let navigate = useNavigate();

    let handleUpdate = () => {
        navigate("/edit-video/" + attributes.id, { state: attributes.id});
    }
    let handleDelete = (id) => {
        deleteVideo(id);
        window.location.reload();
    }
    return (
        <tr>
            <td>{attributes.title}</td>
            <td>{attributes.duration}</td>
            <td>
                <div className="col">
                    <button type="button" className="btn btn-outline-success" onClick={handleUpdate}>Update</button>
                    <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(attributes.id)}>Delete</button>
                </div>
            </td>
        </tr>
    )
}


export default VideoRow;