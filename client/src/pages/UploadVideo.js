import {React, useState} from "react";
import {createVideo} from "../endpoint/gateway";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";

const UploadVideo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [coverPhoto, setCoverPhoto] = useState("");
    const [videoFile, setVideoFile] = useState();

    let navigate = useNavigate();

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

        if(videoFile === ""){
            Notification("Video is required", "error", 2000);
            isFormValid = false;
        }
        else{
            if(videoFile.name.split(".")[1] !== "mp4"){
                Notification("Video must be in mp4 format", "error", 2000);
                isFormValid = false;
            }
        }
        return isFormValid;
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if(handleValidation()){
            const formData = new FormData();
            formData.append('videoFile', videoFile);
            formData.append('coverPhoto', coverPhoto);
            formData.append('title', title);
            formData.append('description', description);
            await createVideo(formData);
            navigate("/list-video");
        }
    }

    return (
        <div>
            <Navbar/>
            <br/>
            <div className="container">
                <h2> Upload Video </h2>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title"  placeholder="Enter title" onChange={(e)=> setTitle(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="description">Description</label>
                                <input type="text-area" className="form-control" id="description"  placeholder="Enter description" onChange={(e)=> setDescription(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="coverPhoto">Cover Photo Path</label>
                                <input type="text" className="form-control" id="coverPhoto"  placeholder="Enter cover photo link" onChange={(e)=> setCoverPhoto(e.target.value)}/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="video">Upload Video</label>
                                <input accept=".mp4" type="file" className="form-control" id="video"  placeholder="Upload Video" onChange={(e)=> setVideoFile(e.target.files[0])}/>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary"  onClick={handleRegister}>Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default UploadVideo;