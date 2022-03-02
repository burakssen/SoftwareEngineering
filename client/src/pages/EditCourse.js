import Navbar from "../components/Navbar";
import '../styles/course.css'
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    getCourseById,
    getVideo,
    getVideosOfCourse,
    updateCourse,
    removeVideoFromCourse,
    getAllVideoCourseMatchings
} from "../endpoint/gateway";
import Notification from "../components/Notification";

const EditCourse = () => {
    const [course, setCourse] = useState();
	const [videos, setVideos] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");


    let params = useParams();
    let courseId = params.courseid;

    useEffect(async () => {
        const allVideos = [];
        const videoIds = await getVideosOfCourse(courseId);
        
        const courseInfo = await getCourseById(courseId);
        setCourse(courseInfo.data.course);

        setCourseName(courseInfo.data.course.name);
        setCourseDescription(courseInfo.data.course.description);

        for (let i = 0; i < videoIds.data.allVideos.length; i++) {
            let videoId = videoIds.data.allVideos[i].id;
            const video = await getVideo(videoId);
            allVideos.push(video.data.Video);
        }

        setVideos(allVideos);
    }, []);

    const handleValidation = () => {
        let isFormValid = true;
        if(courseName === ""){
            Notification("Course Name is required", "error", 2000);
            isFormValid = false;
        }
        else{
            if(courseName.length < 2 || courseName.length > 32){
                Notification("Course Name should be between 2-32 characters!", "error", 2000);
                isFormValid = false;
            }
        }

        if(courseDescription === ""){
            Notification("Course Description is required", "error", 2000);
            isFormValid = false;
        }
        else{
            if(courseDescription.length > 200){
                Notification("Course Description should not be longer than 200 characters!", "error", 2000);
                isFormValid = false;
            }
        }

        return isFormValid;
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        if(handleValidation()){
            let response = await updateCourse(course, courseName, courseDescription);
            if(response.status === 200){
                Notification("Course updated successfully", "success", 2000);
            }
            else{
                Notification("Something went wrong", "error", 2000);
            }
        }
    }     
    async function handleDelete(videoId) {
        let matchings = await getAllVideoCourseMatchings();
        let matchingId = -1;
        matchings.data.allVideoCourseMatchings.forEach((match) => {
            if(match.videoId === parseInt(videoId) && match.courseId === parseInt(courseId)){
                matchingId = match.id;
            }
        });

        let response = await removeVideoFromCourse(matchingId)
        if(response.status === 200){
            Notification("You removed a video successfully from this course", "success", 2000);
        }
        else{
            Notification("Something went wrong, please try again later", "error", 2000);
        }

        window.location.reload();
    }
    
    return(
        <div className="displayVideos">
            <Navbar/>
            <div className="container">
                <h2>Modify Course </h2>
                <div className="album py-5 bg-light">
                    <form>
                        <label className="form-label">Course Name</label>
                        <input type="text" className="form-control" id="courseName" defaultValue={course && course.name} onChange={(e) => {setCourseName(e.target.value)}}/>
                        
                        <label className="form-label">Course Description</label>
                        <input type="text" className="form-control" id="description" defaultValue={course && course.description} onChange={(e)=>{setCourseDescription(e.target.value || course.description)}}/>
                        <button type="button" className="btn btn-primary" id="description" onClick={handleEdit}>Edit</button> 
                    </form>
                    <div className="container">
                        <div className="row">
                            {videos.map(video => (
                                <div className="col-md-4" key={video.id}>
                                    <div className="card mb-4 box-shadow">
                                        <img className="
                                        card-img-top" src={video.coverPhoto} alt='video cover' />
                                        <div className="card-body">
                                            <h5 className="card-text">{video.title}</h5>
                                            <p className="card-text">{video.description}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <Link to={"/edit-video/" + video.id}><button type="button" className="btn btn-outline-secondary m-1" >Edit</button></Link>
                                                    <button type="button" className="btn btn-danger m-1" aria-label="Close" onClick={() => handleDelete(video.id)}>Delete</button>
                                                </div>

                                                <small className="text-muted">{video.duration} mins</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCourse;