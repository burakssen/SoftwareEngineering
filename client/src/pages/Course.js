import Navbar from "../components/Navbar";
import '../styles/course.css'
import { useParams} from "react-router-dom";
import { useState, useEffect} from "react";
import  VideoCard  from "../components/VideoCard";
import {getCourseById, getVideo, getVideosOfCourse} from "../endpoint/gateway";
import Notification from "../components/Notification";

const Course = () => {
    const [course, setCourse] = useState();
	const [videos, setVideos] = useState([]);

    let params = useParams();
    let courseId = params.courseid;

    useEffect(async () => {
        Notification("Loading", "loading", 2000);
        const allVideos = [];
        const videoIds = await getVideosOfCourse(courseId);
        const response = await getCourseById(courseId);
        setCourse(response.data.course);
        for (let i = 0; i < videoIds.data.allVideos.length; i++) {
            let videoId = videoIds.data.allVideos[i].id;
            const video = await getVideo(videoId);
            
            allVideos.push(video.data.Video);
        }
        setVideos(allVideos);
    }, []);

    return(
        <div className="displayVideos">
            <Navbar/>
            <div className="container">
                {
                    course &&
                    <div>
                        <h1 className="jumbotron-heading">{course.name}</h1>
                        <p className="lead text-muted">{course.description}</p>
                    </div>
                }

                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            {videos.map(video => (
                                    <VideoCard key={video.id} id={video.id} name={video.title} courseId={courseId}  description={video.description}
                                            duration={video.duration}  coverPhoto={video.coverPhoto}>
                                    </VideoCard>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course;