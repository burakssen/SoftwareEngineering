import {React, useEffect, useState} from "react";
import {getVideoById, updateVideo} from "../endpoint/gateway";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";

const EditVideo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [coverPhoto, setCoverPhoto] = useState("");

    let navigate = useNavigate();
    let params = useParams();
    let videoId = params.videoId;

    useEffect(async () => {
        const response = await getVideoById(videoId);
        setTitle(response.data.Video.title);
        setCoverPhoto(response.data.Video.coverPhoto);
        setDescription(response.data.Video.description)
    }, []);

    const handleValidation = () => {
        let isFormValid = true;
        if(title === ""){
            Notification("Title is required", "error", 2000);
            isFormValid = false;
        }
        else{
            if(title.length < 2 || title.length > 32){
                Notification("Title should be between 2-32 characters", "error", 2000);
                isFormValid = false;
            }
        }

        if(description === ""){
            Notification("Description is required", "error", 2000);
            isFormValid = false;
        }
        else{
            if(description.length < 2 || description.length > 255){
                Notification("Description should be between 2-255 characters", "error", 2000);
                isFormValid = false;
            }
        }

        if(coverPhoto === ""){
            Notification("Cover photo is required", "error", 2000);
            isFormValid = false;
        }
        else{
            if(coverPhoto.length < 2 || coverPhoto.length > 255){
                Notification("Cover photo should be between 2-255 characters", "error", 2000);
                isFormValid = false;
            }
        }
        return isFormValid;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if(handleValidation()){
            const video = {
                id: videoId,
                title: title,
                description: description,
                coverPhoto: coverPhoto,
            }

            updateVideo(video);
            navigate("/list-video");
        }
    }

    return (
        <div>
            <Navbar/>
            <br/>
            <div className="container">
                <h2> Edit Video </h2>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title"  placeholder="Enter title" defaultValue={title} onChange={(e)=> setTitle(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="description">Description</label>
                                <input type="text-area" className="form-control" id="description"  placeholder="Enter description" defaultValue={description} onChange={(e)=> setDescription(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="coverPhoto">Cover Photo Path</label>
                                <input type="text" className="form-control" id="coverPhoto"  placeholder="Enter cover photo link" defaultValue={coverPhoto} onChange={(e)=> setCoverPhoto(e.target.value)}/>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary"  onClick={handleRegister}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default EditVideo;